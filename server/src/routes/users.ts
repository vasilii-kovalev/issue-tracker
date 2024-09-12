import {
	type FastifyPluginCallback,
} from "fastify";

import {
	ResponseStatus,
} from "@/constants";
import {
	checkJwt,
} from "@/models/auth/middleware/check-jwt";
import {
	getUserIdFromJwtCookie,
} from "@/models/auth/utilities/get-user-id-from-jwt-cookie";
import {
	ErrorCode,
} from "@/models/errors/constants";
import {
	type ErrorResponse,
	type ValidationError,
} from "@/models/errors/types";
import {
	PermissionId,
} from "@/models/permissions/constants";
import {
	checkPermissions,
} from "@/models/permissions/middleware/check-permissions";
import {
	hasPermissions,
} from "@/models/permissions/utilities/has-permissions";
import {
	checkUserIdValidity,
} from "@/models/users/middleware/check-user-id-validity";
import {
	UserModel,
} from "@/models/users/model";
import {
	type User,
	type UserId,
} from "@/models/users/types";
import {
	isNull,
} from "@/utilities/is-null";

const usersRoutes: FastifyPluginCallback = (server, options, done): void => {
	// Get users.
	server.get<{
		Reply: Array<User> | ErrorResponse;
	}>(
		"/",
		{
			onRequest: [
				checkJwt,
			],
		},
		async (request, response) => {
			try {
				const users = await UserModel.find();

				return await response
					.status(ResponseStatus.OK)
					.send(users);
			} catch (error) {
				const typedError = error as Error;
				const status = ResponseStatus.INTERNAL_SERVER_ERROR;

				return await response
					.status(status)
					.send({
						message: typedError.message,
						status,
					});
			}
		},
	);

	// Get user.
	server.get<{
		Params: {
			id: UserId;
		};
		Reply: User | ErrorResponse;
	}>(
		"/:id",
		{
			onRequest: [
				checkJwt,
				checkUserIdValidity,
			],
		},
		async (request, response) => {
			try {
				const {
					params: {
						id,
					},
				} = request;

				const user = await UserModel.findById(id);

				if (isNull(user)) {
					const status = ResponseStatus.NOT_FOUND;

					return await response
						.status(status)
						.send({
							code: ErrorCode.NOT_FOUND,
							entities: [
								"user",
							],
							status,
						});
				}

				return await response
					.status(ResponseStatus.OK)
					.send(user);
			} catch (error) {
				const typedError = error as Error;
				const status = ResponseStatus.INTERNAL_SERVER_ERROR;

				return await response
					.status(status)
					.send({
						message: typedError.message,
						status,
					});
			}
		},
	);

	// Create user.
	server.post<{
		Body: User;
		Reply: User | ErrorResponse;
	}>(
		"/create",
		{
			onRequest: [
				checkJwt,
				checkPermissions([
					PermissionId.CAN_MANAGE_USERS,
				]),
			],
		},
		async (request, response) => {
			try {
				const {
					body: {
						displayedName,
						email,
						password,
						roles,
						userName,
					},
				} = request;

				const user = await UserModel.create({
					displayedName,
					email,
					password,
					roles,
					userName,
				});

				return await response
					.status(ResponseStatus.CREATED)
					.send(user);
			} catch (error) {
				const typedError = error as Error | ValidationError;
				const status = ResponseStatus.INTERNAL_SERVER_ERROR;

				return await response
					.status(status)
					.send({
						message: typedError.message,
						status,
					});
			}
		},
	);

	// Update user.
	server.patch<{
		Params: {
			id: UserId;
		};
		Body: Partial<User>;
		Reply: User | ErrorResponse;
	}>(
		"/update/:id",
		{
			onRequest: [
				checkJwt,
				checkUserIdValidity,
			],
		},
		async (request, response) => {
			try {
				const {
					params: {
						id,
					},
					body: {
						displayedName,
						email,
						password,
						userName,
					},
				} = request;

				const userIdFromJwtCookie = getUserIdFromJwtCookie(
					server,
					request,
				);

				if (userIdFromJwtCookie !== id) {
					const hasPermissionsForRequest = await hasPermissions(
						userIdFromJwtCookie,
						[
							PermissionId.CAN_MANAGE_USERS,
						],
					);

					if (!hasPermissionsForRequest) {
						const status = ResponseStatus.FORBIDDEN;

						return await response
							.status(status)
							.send({
								status,
							});
					}
				}

				const user = await UserModel.findByIdAndUpdate(
					id,
					{
						displayedName,
						email,
						password,
						userName,
					},
					{
						new: true,
					},
				);

				if (isNull(user)) {
					const status = ResponseStatus.NOT_FOUND;

					return await response
						.status(status)
						.send({
							code: ErrorCode.NOT_FOUND,
							entities: [
								"user",
							],
							status,
						});
				}

				return await response
					.status(ResponseStatus.OK)
					.send(user);
			} catch (error) {
				const typedError = error as Error | ValidationError;
				const status = ResponseStatus.INTERNAL_SERVER_ERROR;

				return await response
					.status(status)
					.send({
						message: typedError.message,
						status,
					});
			}
		},
	);

	// Delete user.
	server.delete<{
		Params: {
			id: UserId;
		};
		Reply: User | ErrorResponse;
	}>(
		"/delete/:id",
		{
			onRequest: [
				checkJwt,
				checkPermissions([
					PermissionId.CAN_MANAGE_USERS,
				]),
				checkUserIdValidity,
			],
		},
		async (request, response) => {
			try {
				const {
					params: {
						id,
					},
				} = request;

				const user = await UserModel.findByIdAndDelete(id);

				if (isNull(user)) {
					const status = ResponseStatus.NOT_FOUND;

					return await response
						.status(status)
						.send({
							code: ErrorCode.NOT_FOUND,
							entities: [
								"user",
							],
							status,
						});
				}

				return await response
					.status(ResponseStatus.OK)
					.send(user);
			} catch (error) {
				const typedError = error as Error;
				const status = ResponseStatus.INTERNAL_SERVER_ERROR;

				return await response
					.status(status)
					.send({
						message: typedError.message,
						status,
					});
			}
		},
	);

	done();
};

export {
	usersRoutes,
};
