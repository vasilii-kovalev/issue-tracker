import {
	type FastifyPluginCallback,
} from "fastify";

import {
	ResponseStatus,
} from "@/constants";
import {
	COOKIE_JWT_TOKEN_NAME,
} from "@/models/auth/constants";
import {
	checkJwt,
} from "@/models/auth/middleware/check-jwt";
import {
	getUserIdFromJwtCookie,
} from "@/models/auth/utilities/get-user-id-from-jwt-cookie";
import {
	type ErrorResponse,
	type MongooseValidationError,
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
	getEmailDuplicationValidationError,
} from "@/models/users/utilities/get-email-duplication-validation-error";
import {
	getUserValidationErrors,
} from "@/models/users/utilities/get-user-validation-errors";
import {
	SchemaId,
	SchemaTag,
} from "@/schemas/constants";
import {
	isNull,
} from "@/utilities/is-null";
import {
	isUndefined,
} from "@/utilities/is-undefined";

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
					[ResponseStatus.OK]: {
						items: {
							$ref: SchemaId.USER,
						},
						type: "array",
					},
					[ResponseStatus.UNAUTHORIZED]: {
						$ref: SchemaId.ERROR_RESPONSE_WITH_MESSAGE,
						description: "Unauthorized",
					},
					[ResponseStatus.INTERNAL_SERVER_ERROR]: {
						$ref: SchemaId.ERROR_RESPONSE_WITH_MESSAGE,
						description: "Internal server error",
					},
				},
				summary: "Get users",
				tags: [
					SchemaTag.USERS,
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
					[ResponseStatus.OK]: {
						$ref: SchemaId.USER,
					},
					[ResponseStatus.BAD_REQUEST]: {
						$ref: SchemaId.ERROR_RESPONSE_WITH_MESSAGE,
						description: "Invalid user ID",
					},
					[ResponseStatus.UNAUTHORIZED]: {
						$ref: SchemaId.ERROR_RESPONSE_WITH_MESSAGE,
						description: "Unauthorized",
					},
					[ResponseStatus.NOT_FOUND]: {
						$ref: SchemaId.ERROR_RESPONSE_WITH_MESSAGE,
						description: "User with provided user ID doesn't exist",
					},
					[ResponseStatus.INTERNAL_SERVER_ERROR]: {
						$ref: SchemaId.ERROR_RESPONSE_WITH_MESSAGE,
						description: "Internal server error",
					},
				},
				summary: "Get user",
				tags: [
					SchemaTag.USERS,
				],
			},
		},
		async (request, response) => {
			const {
				params: {
					id,
				},
			} = request;

			try {
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
					$ref: SchemaId.USER_CREATE,
				},
				response: {
					[ResponseStatus.CREATED]: {
						$ref: SchemaId.USER,
					},
					[ResponseStatus.BAD_REQUEST]: {
						$ref: SchemaId.ERROR_RESPONSE_WITH_VALIDATION_ERRORS,
						description: "Validation errors",
					},
					[ResponseStatus.UNAUTHORIZED]: {
						$ref: SchemaId.ERROR_RESPONSE_WITH_MESSAGE,
						description: "Unauthorized",
					},
					[ResponseStatus.FORBIDDEN]: {
						description: "Forbidden by permissions",
						type: "null",
					},
					[ResponseStatus.INTERNAL_SERVER_ERROR]: {
						$ref: SchemaId.ERROR_RESPONSE_WITH_MESSAGE,
						description: "Internal server error",
					},
				},
				summary: "Create user",
				tags: [
					SchemaTag.USERS,
				],
			},
		},
		async (request, response) => {
			const {
				body: {
					displayedName,
					email,
					password,
					roles,
				},
			} = request;

			try {
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
				const errorMessage = typedError.message;

				const emailDuplicationValidationError = getEmailDuplicationValidationError(
					errorMessage,
					email,
				);

				if (!isUndefined(emailDuplicationValidationError)) {
					return await response
						.status(ResponseStatus.BAD_REQUEST)
						.send({
							message: errorMessage,
							validationErrors: [
								emailDuplicationValidationError,
							],
						});
				}

				if ("errors" in typedError) {
					const validationErrors = getUserValidationErrors(typedError);

					return await response
						.status(ResponseStatus.BAD_REQUEST)
						.send({
							message: errorMessage,
							validationErrors,
						});
				}

				return await response
					.status(ResponseStatus.INTERNAL_SERVER_ERROR)
					.send({
						message: errorMessage,
					});
			}
		},
	);

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
				body: {
					$ref: SchemaId.USER_UPDATE,
				},
				description: `Updates user by ID.
				Note: after user data update, a new JWT token with the new data is set to cookies.`,
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
					[ResponseStatus.OK]: {
						$ref: SchemaId.USER,
					},
					[ResponseStatus.BAD_REQUEST]: {
						oneOf: [
							{
								$ref: SchemaId.ERROR_RESPONSE_WITH_MESSAGE,
								description: "Invalid user ID",
							},
							{
								$ref: SchemaId.ERROR_RESPONSE_WITH_VALIDATION_ERRORS,
								description: "Validation errors",
							},
						],
					},
					[ResponseStatus.UNAUTHORIZED]: {
						$ref: SchemaId.ERROR_RESPONSE_WITH_MESSAGE,
						description: "Unauthorized",
					},
					[ResponseStatus.NOT_FOUND]: {
						$ref: SchemaId.ERROR_RESPONSE_WITH_MESSAGE,
						description: "User with provided user ID doesn't exist",
					},
					[ResponseStatus.INTERNAL_SERVER_ERROR]: {
						$ref: SchemaId.ERROR_RESPONSE_WITH_MESSAGE,
						description: "Internal server error",
					},
				},
				summary: "Update user",
				tags: [
					SchemaTag.USERS,
				],
			},
		},
		async (request, response) => {
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

			try {
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

				const token = server.jwt.sign({
					payload: user.toJSON(),
				});

				return await response
					// Like in `/api/auth/login`.
					.setCookie(
						COOKIE_JWT_TOKEN_NAME,
						token,
						{
							path: "/",
						},
					)
					.status(ResponseStatus.OK)
					.send(user);
			} catch (error) {
				const typedError = error as Error | MongooseValidationError;
				const errorMessage = typedError.message;

				const emailDuplicationValidationError = getEmailDuplicationValidationError(
					errorMessage,
					// If this error occurs, then the email is present in the request.
					// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
					email!,
				);

				if (!isUndefined(emailDuplicationValidationError)) {
					return await response
						.status(ResponseStatus.BAD_REQUEST)
						.send({
							message: errorMessage,
							validationErrors: [
								emailDuplicationValidationError,
							],
						});
				}

				if ("errors" in typedError) {
					const validationErrors = getUserValidationErrors(typedError);

					return await response
						.status(ResponseStatus.BAD_REQUEST)
						.send({
							message: errorMessage,
							validationErrors,
						});
				}

				return await response
					.status(ResponseStatus.INTERNAL_SERVER_ERROR)
					.send({
						message: errorMessage,
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
				description: `Deletes user by ID.
				Note: admins can also remove themselves. In this case, they are logged out automatically.`,
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
					[ResponseStatus.OK]: {
						$ref: SchemaId.USER,
					},
					[ResponseStatus.BAD_REQUEST]: {
						$ref: SchemaId.ERROR_RESPONSE_WITH_MESSAGE,
						description: "Invalid user ID",
					},
					[ResponseStatus.UNAUTHORIZED]: {
						$ref: SchemaId.ERROR_RESPONSE_WITH_MESSAGE,
						description: "Unauthorized",
					},
					[ResponseStatus.FORBIDDEN]: {
						description: "Forbidden by permissions",
						type: "null",
					},
					[ResponseStatus.NOT_FOUND]: {
						$ref: SchemaId.ERROR_RESPONSE_WITH_MESSAGE,
						description: "User with provided user ID doesn't exist",
					},
					[ResponseStatus.INTERNAL_SERVER_ERROR]: {
						$ref: SchemaId.ERROR_RESPONSE_WITH_MESSAGE,
						description: "Internal server error",
					},
				},
				summary: "Delete user",
				tags: [
					SchemaTag.USERS,
				],
			},
		},
		async (request, response) => {
			const {
				params: {
					id,
				},
			} = request;

			try {
				const user = await UserModel.findByIdAndDelete(id);

				if (isNull(user)) {
					return await response
						.status(ResponseStatus.NOT_FOUND)
						.send({
							message: `User with id "${id}" doesn't exist.`,
						});
				}

				const userIdFromJwtCookie = getUserIdFromJwtCookie(
					server,
					request,
				);

				if (userIdFromJwtCookie === id) {
					return await response
						// Like in `/api/auth/logout`.
						.clearCookie(COOKIE_JWT_TOKEN_NAME)
						.status(ResponseStatus.OK)
						.send(user);
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
