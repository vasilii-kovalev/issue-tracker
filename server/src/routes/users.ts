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
	getUserValidationErrors,
} from "@/models/users/utilities/get-user-validation-errors";
import {
	type ErrorResponse,
	type MongooseValidationError,
} from "@/types/errors";
import {
	isNull,
} from "@/utilities/is-null";

const usersRoutes: FastifyPluginCallback = (server, options, done): void => {
	server.get<{
		Reply: Array<User> | ErrorResponse;
	}>(
		"/api/users",
		{
			onRequest: [
				checkJwt,
			],
			schema: {
				response: {
					// eslint-disable-next-line @typescript-eslint/naming-convention
					200: {
						items: {
							$ref: "UserSchema",
						},
						type: "array",
					},
					// eslint-disable-next-line @typescript-eslint/naming-convention
					401: {
						$ref: "ErrorResponseWithMessageSchema",
						description: "Unauthorized",
					},
					// eslint-disable-next-line @typescript-eslint/naming-convention
					500: {
						$ref: "ErrorResponseWithMessageSchema",
						description: "Internal server error",
					},
				},
				summary: "Get users",
				tags: [
					"users",
				],
			},
		},
		async (request, response) => {
			try {
				const users = await UserModel.find();

				return await response
					.status(ResponseStatus.OK)
					.send(users);
			} catch (error) {
				const typedError = error as Error;

				return await response
					.status(ResponseStatus.INTERNAL_SERVER_ERROR)
					.send({
						message: typedError.message,
					});
			}
		},
	);

	server.get<{
		Params: {
			id: UserId;
		};
		Reply: User | ErrorResponse;
	}>(
		"/api/users/:id",
		{
			onRequest: [
				checkJwt,
				checkUserIdValidity,
			],
			schema: {
				params: {
					properties: {
						id: {
							description: "User ID",
							type: "string",
						},
					},
					type: "object",
				},
				response: {
					// eslint-disable-next-line @typescript-eslint/naming-convention
					200: {
						$ref: "UserSchema",
					},
					// eslint-disable-next-line @typescript-eslint/naming-convention
					400: {
						$ref: "ErrorResponseWithMessageSchema",
						description: "Invalid user ID",
					},
					// eslint-disable-next-line @typescript-eslint/naming-convention
					401: {
						$ref: "ErrorResponseWithMessageSchema",
						description: "Unauthorized",
					},
					// eslint-disable-next-line @typescript-eslint/naming-convention
					404: {
						$ref: "ErrorResponseWithMessageSchema",
						description: "User with provided user ID doesn't exist",
					},
					// eslint-disable-next-line @typescript-eslint/naming-convention
					500: {
						$ref: "ErrorResponseWithMessageSchema",
						description: "Internal server error",
					},
				},
				summary: "Get user",
				tags: [
					"users",
				],
			},
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
					return await response
						.status(ResponseStatus.NOT_FOUND)
						.send({
							message: `User with id "${id}" doesn't exist.`,
						});
				}

				return await response
					.status(ResponseStatus.OK)
					.send(user);
			} catch (error) {
				const typedError = error as Error;

				return await response
					.status(ResponseStatus.INTERNAL_SERVER_ERROR)
					.send({
						message: typedError.message,
					});
			}
		},
	);

	server.post<{
		Body: User;
		Reply: User | ErrorResponse;
	}>(
		"/api/users/create",
		{
			onRequest: [
				checkJwt,
				checkPermissions([
					PermissionId.CAN_MANAGE_USERS,
				]),
			],
			schema: {
				body: {
					$ref: "UserCreateSchema",
				},
				response: {
					// eslint-disable-next-line @typescript-eslint/naming-convention
					201: {
						$ref: "UserSchema",
					},
					// eslint-disable-next-line @typescript-eslint/naming-convention
					400: {
						$ref: "ErrorResponseWithValidationErrorsSchema",
						description: "Validation errors",
					},
					// eslint-disable-next-line @typescript-eslint/naming-convention
					401: {
						$ref: "ErrorResponseWithMessageSchema",
						description: "Unauthorized",
					},
					// eslint-disable-next-line @typescript-eslint/naming-convention
					403: {
						description: "Forbidden by permissions",
						type: "null",
					},
					// eslint-disable-next-line @typescript-eslint/naming-convention
					500: {
						$ref: "ErrorResponseWithMessageSchema",
						description: "Internal server error",
					},
				},
				summary: "Create user",
				tags: [
					"users",
				],
			},
		},
		async (request, response) => {
			try {
				const {
					body: {
						displayedName,
						email,
						password,
						roles,
					},
				} = request;

				const user = await UserModel.create({
					displayedName,
					email,
					password,
					roles,
				});

				return await response
					.status(ResponseStatus.CREATED)
					.send(user);
			} catch (error) {
				const typedError = error as Error | MongooseValidationError;

				if ("errors" in typedError) {
					const validationErrors = getUserValidationErrors(typedError);

					return await response
						.status(ResponseStatus.BAD_REQUEST)
						.send({
							message: typedError.message,
							validationErrors,
						});
				}

				return await response
					.status(ResponseStatus.INTERNAL_SERVER_ERROR)
					.send({
						message: typedError.message,
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
		"/api/users/update/:id",
		{
			onRequest: [
				checkJwt,
				checkUserIdValidity,
			],
			schema: {
				params: {
					properties: {
						id: {
							description: "User ID",
							type: "string",
						},
					},
					type: "object",
				},
				response: {
					// eslint-disable-next-line @typescript-eslint/naming-convention
					200: {
						$ref: "UserSchema",
					},
					// eslint-disable-next-line @typescript-eslint/naming-convention
					400: {
						$ref: "ErrorResponseWithValidationErrorsSchema",
						description: "Invalid user ID (only `message` is returned) or validation errors",
					},
					// eslint-disable-next-line @typescript-eslint/naming-convention
					401: {
						$ref: "ErrorResponseWithMessageSchema",
						description: "Unauthorized",
					},
					// eslint-disable-next-line @typescript-eslint/naming-convention
					404: {
						$ref: "ErrorResponseWithMessageSchema",
						description: "User with provided user ID doesn't exist",
					},
					// eslint-disable-next-line @typescript-eslint/naming-convention
					500: {
						$ref: "ErrorResponseWithMessageSchema",
						description: "Internal server error",
					},
				},
				summary: "Get user",
				tags: [
					"users",
				],
			},
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
						roles,
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
						return await response
							.status(ResponseStatus.FORBIDDEN)
							.send();
					}
				}

				const user = await UserModel.findByIdAndUpdate(
					id,
					{
						displayedName,
						email,
						password,
						roles,
					},
					{
						new: true,
					},
				);

				if (isNull(user)) {
					return await response
						.status(ResponseStatus.NOT_FOUND)
						.send({
							message: `User with id "${id}" doesn't exist.`,
						});
				}

				return await response
					.status(ResponseStatus.OK)
					.send(user);
			} catch (error) {
				const typedError = error as Error | MongooseValidationError;

				if ("errors" in typedError) {
					const validationErrors = getUserValidationErrors(typedError);

					return await response
						.status(ResponseStatus.BAD_REQUEST)
						.send({
							message: typedError.message,
							validationErrors,
						});
				}

				return await response
					.status(ResponseStatus.INTERNAL_SERVER_ERROR)
					.send({
						message: typedError.message,
					});
			}
		},
	);

	server.delete<{
		Params: {
			id: UserId;
		};
		Reply: User | ErrorResponse;
	}>(
		"/api/users/delete/:id",
		{
			onRequest: [
				checkJwt,
				checkPermissions([
					PermissionId.CAN_MANAGE_USERS,
				]),
				checkUserIdValidity,
			],
			schema: {
				params: {
					properties: {
						id: {
							description: "User ID",
							type: "string",
						},
					},
					type: "object",
				},
				response: {
					// eslint-disable-next-line @typescript-eslint/naming-convention
					200: {
						$ref: "UserSchema",
					},
					// eslint-disable-next-line @typescript-eslint/naming-convention
					400: {
						$ref: "ErrorResponseWithMessageSchema",
						description: "Invalid user ID",
					},
					// eslint-disable-next-line @typescript-eslint/naming-convention
					401: {
						$ref: "ErrorResponseWithMessageSchema",
						description: "Unauthorized",
					},
					// eslint-disable-next-line @typescript-eslint/naming-convention
					403: {
						description: "Forbidden by permissions",
						type: "null",
					},
					// eslint-disable-next-line @typescript-eslint/naming-convention
					404: {
						$ref: "ErrorResponseWithMessageSchema",
						description: "User with provided user ID doesn't exist",
					},
					// eslint-disable-next-line @typescript-eslint/naming-convention
					500: {
						$ref: "ErrorResponseWithMessageSchema",
						description: "Internal server error",
					},
				},
				summary: "Delete user",
				tags: [
					"users",
				],
			},
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
					return await response
						.status(ResponseStatus.NOT_FOUND)
						.send({
							message: `User with id "${id}" doesn't exist.`,
						});
				}

				return await response
					.status(ResponseStatus.OK)
					.send(user);
			} catch (error) {
				const typedError = error as Error;

				return await response
					.status(ResponseStatus.INTERNAL_SERVER_ERROR)
					.send({
						message: typedError.message,
					});
			}
		},
	);

	done();
};

export {
	usersRoutes,
};
