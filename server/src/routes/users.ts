import {
	type FastifyPluginCallback,
} from "fastify";
import mongoose from "mongoose";

import {
	ResponseStatus,
} from "@/constants";
import {
	checkJwt,
	getUserIdFromJwtCookie,
} from "@/models/auth";
import {
	ErrorCode,
	type ResponseError,
} from "@/models/errors";
import {
	checkPermissions,
	hasPermissions,
	PermissionId,
} from "@/models/permissions";
import {
	type User,
	type UserId,
	UserModel,
} from "@/models/users";
import {
	isNull,
} from "@/utilities/is-null";

const usersRoutes: FastifyPluginCallback = (server, options, done): void => {
	// Get users.
	server.get<{
		Reply: Array<User> | ResponseError;
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
		Reply: User | ResponseError;
	}>(
		"/:id",
		{
			onRequest: [
				checkJwt,
			],
		},
		async (request, response) => {
			try {
				const {
					params: {
						id,
					},
				} = request;

				const isValidId = mongoose.isValidObjectId(id);

				if (!isValidId) {
					const status = ResponseStatus.BAD_REQUEST;

					return await response
						.status(status)
						.send({
							code: ErrorCode.BAD_REQUEST,
							entities: [
								"id",
							],
							status,
						});
				}

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
		Reply: User | ResponseError;
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

				const user = new UserModel({
					displayedName,
					email,
					password,
					roles,
					userName,
				});

				const [
					userWithRequestEmail,
					userWithRequestUserName,
				] = await Promise.all([
					UserModel.findOne({
						email,
					}),
					UserModel.findOne({
						userName,
					}),
				]);

				const errorEntities: Array<string> = [];

				if (!isNull(userWithRequestEmail)) {
					errorEntities.push("email");
				}

				if (!isNull(userWithRequestUserName)) {
					errorEntities.push("userName");
				}

				if (errorEntities.length > 0) {
					const status = ResponseStatus.BAD_REQUEST;

					return await response
						.status(status)
						.send({
							code: ErrorCode.DUPLICATE_FIELD,
							entities: errorEntities,
							status,
						});
				}

				await user.save();

				return await response
					.status(ResponseStatus.CREATED)
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

	// Update user.
	server.patch<{
		Params: {
			id: UserId;
		};
		Body: Partial<User>;
		Reply: User | ResponseError;
	}>(
		"/update/:id",
		{
			onRequest: [
				checkJwt,
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

				const isValidId = mongoose.isValidObjectId(id);

				if (!isValidId) {
					const status = ResponseStatus.BAD_REQUEST;

					return await response
						.status(status)
						.send({
							code: ErrorCode.BAD_REQUEST,
							entities: [
								"id",
							],
							status,
						});
				}

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

	// Delete user.
	server.delete<{
		Params: {
			id: UserId;
		};
		Reply: User | ResponseError;
	}>(
		"/delete/:id",
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
					params: {
						id,
					},
				} = request;

				const isValidId = mongoose.isValidObjectId(id);

				if (!isValidId) {
					const status = ResponseStatus.BAD_REQUEST;

					return await response
						.status(status)
						.send({
							code: ErrorCode.BAD_REQUEST,
							entities: [
								"id",
							],
							status,
						});
				}

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
