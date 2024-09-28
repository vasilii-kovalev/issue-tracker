import {
	type FastifyPluginCallback,
} from "fastify";

import {
	ResponseStatus,
} from "@/constants/api";
import {
	SchemaId,
	SchemaTag,
} from "@/constants/schemas";
import {
	COOKIE_JWT_TOKEN_NAME,
} from "@/models/auth/constants";
import {
	checkJwt,
} from "@/models/auth/middleware/check-jwt";
import {
	type JwtPayload,
} from "@/models/auth/types";
import {
	getUserIdFromJwtCookie,
} from "@/models/auth/utilities/get-user-id-from-jwt-cookie";
import {
	type ErrorResponse,
	type MongooseValidationError,
} from "@/models/errors/types";
import {
	type PaginatedPageQueryParams,
} from "@/models/pagination/types";
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
	type SortingOptions,
} from "@/types/mongoose";
import {
	isNull,
} from "@/utilities/is-null";
import {
	isUndefined,
} from "@/utilities/is-undefined";

import {
	checkUserIdValidity,
} from "./middleware/check-user-id-validity";
import {
	UserModel,
} from "./model";
import {
	type User,
	type UserCreate,
	type UserId,
	type UsersPaginatedPage,
	type UserUpdate,
} from "./types";
import {
	getEmailDuplicationValidationError,
} from "./utilities/get-email-duplication-validation-error";
import {
	getUserValidationErrors,
} from "./utilities/get-user-validation-errors";

const usersRoutes: FastifyPluginCallback = (server, options, done): void => {
	server.get<{
		Querystring: PaginatedPageQueryParams;
		Reply: UsersPaginatedPage | ErrorResponse;
	}>(
		"/api/users",
		{
			attachValidation: true,
			onRequest: [
				checkJwt,
			],
			schema: {
				querystring: {
					$ref: SchemaId.PAGINATION_PAGE_QUERY_PARAMS,
				},
				response: {
					[ResponseStatus.OK]: {
						$ref: SchemaId.USERS_PAGINATED_PAGE,
						description: "Paginated users",
					},
					[ResponseStatus.BAD_REQUEST]: {
						$ref: SchemaId.ERROR_RESPONSE,
						description: "Validation errors (schema)",
					},
					[ResponseStatus.UNAUTHORIZED]: {
						$ref: SchemaId.ERROR_RESPONSE,
						description: "Unauthorized",
					},
					[ResponseStatus.INTERNAL_SERVER_ERROR]: {
						$ref: SchemaId.ERROR_RESPONSE,
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
			const {
				validationError,
			} = request;

			if (!isUndefined(validationError)) {
				return await response
					.status(ResponseStatus.BAD_REQUEST)
					.send({
						message: validationError.message,
						validationErrors: [],
					});
			}

			const {
				count,
				pageNumber,
			} = request.query;

			try {
				const [
					users,
					usersTotalCount,
				] = await Promise.all([
					UserModel.find(
						{},
						undefined,
						{
							limit: count,
							skip: count * (pageNumber - 1),
							sort: {
								displayedName: "asc",
							} satisfies SortingOptions<User>,
						},
					),
					UserModel.countDocuments(),
				]);

				return await response
					.status(ResponseStatus.OK)
					.send({
						data: users,
						itemsCount: users.length,
						pagesTotalCount: Math.ceil(usersTotalCount / count),
					});
			} catch (error) {
				const typedError = error as Error;

				return await response
					.status(ResponseStatus.INTERNAL_SERVER_ERROR)
					.send({
						message: typedError.message,
						validationErrors: [],
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
			attachValidation: true,
			onRequest: [
				checkJwt,
			],
			preHandler: [
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
						$ref: SchemaId.ERROR_RESPONSE,
						description: "Invalid user ID",
					},
					[ResponseStatus.UNAUTHORIZED]: {
						$ref: SchemaId.ERROR_RESPONSE,
						description: "Unauthorized",
					},
					[ResponseStatus.NOT_FOUND]: {
						$ref: SchemaId.ERROR_RESPONSE,
						description: "User with provided user ID doesn't exist",
					},
					[ResponseStatus.INTERNAL_SERVER_ERROR]: {
						$ref: SchemaId.ERROR_RESPONSE,
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
				validationError,
			} = request;

			if (!isUndefined(validationError)) {
				return await response
					.status(ResponseStatus.BAD_REQUEST)
					.send({
						message: validationError.message,
						validationErrors: [],
					});
			}

			const {
				id,
			} = request.params;

			try {
				const user = await UserModel.findById(id);

				if (isNull(user)) {
					return await response
						.status(ResponseStatus.NOT_FOUND)
						.send({
							message: `User with id "${id}" doesn't exist.`,
							validationErrors: [],
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
						validationErrors: [],
					});
			}
		},
	);

	server.post<{
		Body: UserCreate;
		Reply: User | ErrorResponse;
	}>(
		"/api/users/create",
		{
			attachValidation: true,
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
						$ref: SchemaId.ERROR_RESPONSE,
						description: "Validation errors (schema or manual)",
					},
					[ResponseStatus.UNAUTHORIZED]: {
						$ref: SchemaId.ERROR_RESPONSE,
						description: "Unauthorized",
					},
					[ResponseStatus.FORBIDDEN]: {
						description: "Forbidden by permissions",
						type: "null",
					},
					[ResponseStatus.INTERNAL_SERVER_ERROR]: {
						$ref: SchemaId.ERROR_RESPONSE,
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
				validationError,
			} = request;

			if (
				!isUndefined(validationError)
				&& validationError.message === "body must be object"
			) {
				return await response
					.status(ResponseStatus.BAD_REQUEST)
					.send({
						message: validationError.message,
						validationErrors: [],
					});
			}

			const {
				displayedName,
				email,
				password,
				roles,
			} = request.body;

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
						validationErrors: [],
					});
			}
		},
	);

	server.patch<{
		Params: {
			id: UserId;
		};
		Body: UserUpdate;
		Reply: User | ErrorResponse;
	}>(
		"/api/users/update/:id",
		{
			attachValidation: true,
			onRequest: [
				checkJwt,
			],
			preHandler: [
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
						$ref: SchemaId.ERROR_RESPONSE,
						description: "Validation errors (schema or manual)",
					},
					[ResponseStatus.UNAUTHORIZED]: {
						$ref: SchemaId.ERROR_RESPONSE,
						description: "Unauthorized",
					},
					[ResponseStatus.NOT_FOUND]: {
						$ref: SchemaId.ERROR_RESPONSE,
						description: "User with provided user ID doesn't exist",
					},
					[ResponseStatus.INTERNAL_SERVER_ERROR]: {
						$ref: SchemaId.ERROR_RESPONSE,
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
				validationError,
			} = request;

			if (
				!isUndefined(validationError)
				&& validationError.message === "body must be object"
			) {
				return await response
					.status(ResponseStatus.BAD_REQUEST)
					.send({
						message: validationError.message,
						validationErrors: [],
					});
			}

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
						runValidators: true,
					},
				);

				if (isNull(user)) {
					return await response
						.status(ResponseStatus.NOT_FOUND)
						.send({
							message: `User with id "${id}" doesn't exist.`,
							validationErrors: [],
						});
				}

				const token = server.jwt.sign({
					payload: user.toJSON(),
				} satisfies JwtPayload);

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
						validationErrors: [],
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
			attachValidation: true,
			onRequest: [
				checkJwt,
				checkPermissions([
					PermissionId.CAN_MANAGE_USERS,
				]),
			],
			preHandler: [
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
						$ref: SchemaId.ERROR_RESPONSE,
						description: "Invalid user ID",
					},
					[ResponseStatus.UNAUTHORIZED]: {
						$ref: SchemaId.ERROR_RESPONSE,
						description: "Unauthorized",
					},
					[ResponseStatus.FORBIDDEN]: {
						description: "Forbidden by permissions",
						type: "null",
					},
					[ResponseStatus.NOT_FOUND]: {
						$ref: SchemaId.ERROR_RESPONSE,
						description: "User with provided user ID doesn't exist",
					},
					[ResponseStatus.INTERNAL_SERVER_ERROR]: {
						$ref: SchemaId.ERROR_RESPONSE,
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
				validationError,
			} = request;

			if (!isUndefined(validationError)) {
				return await response
					.status(ResponseStatus.BAD_REQUEST)
					.send({
						message: validationError.message,
						validationErrors: [],
					});
			}

			const {
				id,
			} = request.params;

			try {
				const user = await UserModel.findByIdAndDelete(id);

				if (isNull(user)) {
					return await response
						.status(ResponseStatus.NOT_FOUND)
						.send({
							message: `User with id "${id}" doesn't exist.`,
							validationErrors: [],
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
						validationErrors: [],
					});
			}
		},
	);

	done();
};

export {
	usersRoutes,
};
