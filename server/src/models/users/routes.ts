import {
	Prisma,
} from "@prisma/client";
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
	prismaClient,
} from "@/db/client";
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
	ErrorCode,
} from "@/models/errors/constants";
import {
	ResponseWithStatusBadRequestSchema,
	ResponseWithStatusConflict,
	ResponseWithStatusForbidden,
	ResponseWithStatusInternalServerErrorSchema,
	ResponseWithStatusNotFound,
	ResponseWithStatusUnauthorized,
} from "@/models/errors/schema";
import {
	type ErrorResponse,
} from "@/models/errors/types";
import {
	type PaginatedPageQueryParams,
} from "@/models/pagination/types";
import {
	Action,
	Resource,
	Scope,
} from "@/models/permissions/constants";
import {
	checkPermissions,
} from "@/models/permissions/middleware/check-permissions";
import {
	type Permission,
} from "@/models/permissions/types";
import {
	getHasPermissions,
} from "@/models/permissions/utilities/get-has-permissions";
import {
	isNull,
} from "@/utilities/is-null";
import {
	isUndefined,
} from "@/utilities/is-undefined";

import {
	USER_SELECTOR,
} from "./selectors";
import {
	type User,
	type UserCreate,
	type UserId,
	type UsersPaginatedPage,
	type UserUpdate,
} from "./types";
import {
	formatUser,
} from "./utilities/format-user";
import {
	hashUserPassword,
} from "./utilities/user-password";

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
						description: "Paginated users.",
					},
					[ResponseStatus.BAD_REQUEST]: ResponseWithStatusBadRequestSchema,
					[ResponseStatus.UNAUTHORIZED]: ResponseWithStatusUnauthorized,
					[ResponseStatus.INTERNAL_SERVER_ERROR]: ResponseWithStatusInternalServerErrorSchema,
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
						errorCodes: [],
						message: validationError.message,
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
				] = await prismaClient.$transaction([
					prismaClient.user.findMany({
						orderBy: {
							displayedName: "asc",
						},
						select: USER_SELECTOR,
						skip: count * (pageNumber - 1),
						take: count,
					}),
					prismaClient.user.count(),
				]);

				return await response
					.status(ResponseStatus.OK)
					.send({
						data: users.map<User>((user) => {
							return formatUser(user);
						}),
						pagesTotalCount: Math.ceil(usersTotalCount / count),
					});
			} catch (error) {
				const typedError = error as Error;

				return await response
					.status(ResponseStatus.INTERNAL_SERVER_ERROR)
					.send({
						errorCodes: [],
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
			attachValidation: true,
			onRequest: [
				checkJwt,
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
					[ResponseStatus.BAD_REQUEST]: ResponseWithStatusBadRequestSchema,
					[ResponseStatus.UNAUTHORIZED]: ResponseWithStatusUnauthorized,
					[ResponseStatus.NOT_FOUND]: {
						...ResponseWithStatusNotFound,
						description: "User with provided user ID doesn't exist.",
					},
					[ResponseStatus.INTERNAL_SERVER_ERROR]: ResponseWithStatusInternalServerErrorSchema,
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
						errorCodes: [],
						message: validationError.message,
					});
			}

			const {
				id,
			} = request.params;

			try {
				const user = await prismaClient.user.findUnique({
					select: USER_SELECTOR,
					where: {
						id,
					},
				});

				if (isNull(user)) {
					return await response
						.status(ResponseStatus.NOT_FOUND)
						.send({
							errorCodes: [
								ErrorCode.USER_NOT_FOUND_BY_ID,
							],
						});
				}

				return await response
					.status(ResponseStatus.OK)
					.send(formatUser(user));
			} catch (error) {
				const typedError = error as Error;

				return await response
					.status(ResponseStatus.INTERNAL_SERVER_ERROR)
					.send({
						errorCodes: [],
						message: typedError.message,
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
					{
						action: Action.CREATE,
						resource: Resource.USER,
						scope: Scope.ANY,
					},
				]),
			],
			schema: {
				body: {
					$ref: SchemaId.USER_CREATE,
				},
				response: {
					[ResponseStatus.CREATED]: {
						$ref: SchemaId.USER,
						description: "Created user.",
					},
					[ResponseStatus.BAD_REQUEST]: ResponseWithStatusBadRequestSchema,
					[ResponseStatus.UNAUTHORIZED]: ResponseWithStatusUnauthorized,
					[ResponseStatus.FORBIDDEN]: ResponseWithStatusForbidden,
					[ResponseStatus.CONFLICT]: {
						...ResponseWithStatusConflict,
						description: "User with provided email already exists.",
					},
					[ResponseStatus.INTERNAL_SERVER_ERROR]: ResponseWithStatusInternalServerErrorSchema,
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

			if (!isUndefined(validationError)) {
				return await response
					.status(ResponseStatus.BAD_REQUEST)
					.send({
						errorCodes: [],
						message: validationError.message,
					});
			}

			const {
				displayedName,
				email,
				password,
				roles,
			} = request.body;

			try {
				const user = await prismaClient.user.create({
					data: {
						displayedName,
						email: email.toLowerCase(),
						password: await hashUserPassword(password),
						roles: {
							connect: roles.map((role) => {
								return {
									id: role,
								};
							}),
						},
					},
					select: USER_SELECTOR,
				});

				return await response
					.status(ResponseStatus.CREATED)
					.send(formatUser(user));
			} catch (error) {
				if (
					error instanceof Prisma.PrismaClientKnownRequestError
					/**
					 * {@link https://www.prisma.io/docs/orm/reference/error-reference#p2002 | P2002 error code description}
					 */
					&& error.code === "P2002"
					// @ts-expect-error This code is correct.
					// eslint-disable-next-line no-autofix/@typescript-eslint/strict-boolean-expressions, @typescript-eslint/no-unsafe-call
					&& error.meta?.target.includes("email")
				) {
					return await response
						.status(ResponseStatus.CONFLICT)
						.send({
							errorCodes: [
								ErrorCode.USER_VALIDATION_EMAIL_ALREADY_EXISTS,
							],
						});
				}

				const typedError = error as Error;

				return await response
					.status(ResponseStatus.INTERNAL_SERVER_ERROR)
					.send({
						errorCodes: [],
						message: typedError.message,
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
			schema: {
				body: {
					$ref: SchemaId.USER_UPDATE,
				},
				description: `Updates user by ID.
				After user data update, a new JWT token with the new data is set to cookies.`,
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
						description: "Updated user.",
					},
					[ResponseStatus.BAD_REQUEST]: ResponseWithStatusBadRequestSchema,
					[ResponseStatus.UNAUTHORIZED]: ResponseWithStatusUnauthorized,
					[ResponseStatus.NOT_FOUND]: {
						...ResponseWithStatusNotFound,
						description: "User with provided user ID doesn't exist.",
					},
					[ResponseStatus.CONFLICT]: {
						...ResponseWithStatusConflict,
						description: "User with provided email already exists.",
					},
					[ResponseStatus.INTERNAL_SERVER_ERROR]: ResponseWithStatusInternalServerErrorSchema,
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

			if (!isUndefined(validationError)) {
				return await response
					.status(ResponseStatus.BAD_REQUEST)
					.send({
						errorCodes: [],
						message: validationError.message,
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

				const isOwn = userIdFromJwtCookie === id;

				const requiredPermissions: Array<Permission> = isOwn
					? [
						{
							action: Action.UPDATE,
							resource: Resource.USER,
							scope: Scope.OWN,
						},
					]
					: [
						{
							action: Action.UPDATE,
							resource: Resource.USER,
							scope: Scope.ANY,
						},
					];

				const hasPermissionsForRequest = await getHasPermissions({
					permissions: requiredPermissions,
					userId: userIdFromJwtCookie,
				});

				if (!hasPermissionsForRequest) {
					return await response
						.status(ResponseStatus.FORBIDDEN)
						.send();
				}

				const user = await prismaClient.user.update({
					data: {
						displayedName,
						email: !isUndefined(email)
							? email.toLowerCase()
							: undefined,
						password: !isUndefined(password)
							? await hashUserPassword(password)
							: undefined,
						roles: !isUndefined(roles)
							? {
								connect: roles.map((role) => {
									return {
										id: role,
									};
								}),
							}
							: undefined,
					},
					select: USER_SELECTOR,
					where: {
						id,
					},
				});

				const formattedUser = formatUser(user);

				if (!isOwn) {
					return await response
						.status(ResponseStatus.OK)
						.send(formattedUser satisfies User);
				}

				const token = server.jwt.sign({
					payload: formattedUser,
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
					.send(formattedUser satisfies User);
			} catch (error) {
				if (error instanceof Prisma.PrismaClientKnownRequestError) {
					if (
						/**
						 * {@link https://www.prisma.io/docs/orm/reference/error-reference#p2025 | P2025 error code description}
						 */
						error.code === "P2025"
					) {
						return await response
							.status(ResponseStatus.NOT_FOUND)
							.send({
								errorCodes: [
									ErrorCode.USER_NOT_FOUND_BY_ID,
								],
							});
					}

					if (
						/**
						 * {@link https://www.prisma.io/docs/orm/reference/error-reference#p2002 | P2002 error code description}
						 */
						error.code === "P2002"
						// @ts-expect-error This code is correct.
						// eslint-disable-next-line no-autofix/@typescript-eslint/strict-boolean-expressions, @typescript-eslint/no-unsafe-call
						&& error.meta?.target.includes("email")
					) {
						return await response
							.status(ResponseStatus.CONFLICT)
							.send({
								errorCodes: [
									ErrorCode.USER_VALIDATION_EMAIL_ALREADY_EXISTS,
								],
							});
					}
				}

				const typedError = error as Error;

				return await response
					.status(ResponseStatus.INTERNAL_SERVER_ERROR)
					.send({
						errorCodes: [],
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
			attachValidation: true,
			onRequest: [
				checkJwt,
				checkPermissions([
					{
						action: Action.DELETE,
						resource: Resource.USER,
						scope: Scope.ANY,
					},
				]),
			],
			schema: {
				description: `Deletes user by ID.
				Admins can also remove themselves. In this case, they are logged out automatically.`,
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
					[ResponseStatus.BAD_REQUEST]: ResponseWithStatusBadRequestSchema,
					[ResponseStatus.UNAUTHORIZED]: ResponseWithStatusUnauthorized,
					[ResponseStatus.FORBIDDEN]: ResponseWithStatusForbidden,
					[ResponseStatus.NOT_FOUND]: {
						...ResponseWithStatusNotFound,
						description: "User with provided user ID doesn't exist.",
					},
					[ResponseStatus.INTERNAL_SERVER_ERROR]: ResponseWithStatusInternalServerErrorSchema,
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
						errorCodes: [],
						message: validationError.message,
					});
			}

			const {
				id,
			} = request.params;

			try {
				const user = await prismaClient.user.delete({
					select: USER_SELECTOR,
					where: {
						id,
					},
				});

				const userIdFromJwtCookie = getUserIdFromJwtCookie(
					server,
					request,
				);

				const formattedUser = formatUser(user);

				const isOwn = userIdFromJwtCookie === id;

				if (!isOwn) {
					return await response
						.status(ResponseStatus.OK)
						.send(formattedUser);
				}

				return await response
					// Like in `/api/auth/logout`.
					.clearCookie(COOKIE_JWT_TOKEN_NAME)
					.status(ResponseStatus.OK)
					.send(formattedUser);
			} catch (error) {
				if (
					error instanceof Prisma.PrismaClientKnownRequestError
					/**
					 * {@link https://www.prisma.io/docs/orm/reference/error-reference#p2025 | P2025 error code description}
					 */
					&& error.code === "P2025"
				) {
					return await response
						.status(ResponseStatus.NOT_FOUND)
						.send({
							errorCodes: [
								ErrorCode.USER_NOT_FOUND_BY_ID,
							],
						});
				}

				const typedError = error as Error;

				return await response
					.status(ResponseStatus.INTERNAL_SERVER_ERROR)
					.send({
						errorCodes: [],
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
