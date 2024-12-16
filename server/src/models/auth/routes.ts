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
	ErrorCode,
} from "@/models/errors/constants";
import {
	ResponseWithStatusBadRequestSchema,
	ResponseWithStatusInternalServerErrorSchema,
	ResponseWithStatusNotFound,
} from "@/models/errors/schema";
import {
	type ErrorResponse,
} from "@/models/errors/types";
import {
	type UserLogin,
} from "@/models/users/types";
import {
	verifyUserPassword,
} from "@/models/users/utilities/user-password";
import {
	isNull,
} from "@/utilities/is-null";
import {
	isUndefined,
} from "@/utilities/is-undefined";

import {
	COOKIE_JWT_TOKEN_NAME,
} from "./constants";
import {
	type JwtPayload,
} from "./types";

const authRoutes: FastifyPluginCallback = (
	server,
	options,
	done,
): void => {
	server.post<{
		Body: UserLogin;
		Reply: undefined | ErrorResponse;
	}>(
		"/api/auth/login",
		{
			attachValidation: true,
			schema: {
				body: {
					$ref: SchemaId.USER_LOGIN,
				},
				description: `Sets "${COOKIE_JWT_TOKEN_NAME}" JWT cookie in headers.`,
				response: {
					[ResponseStatus.OK]: {
						description: "Empty response.",
						type: "null",
					},
					[ResponseStatus.BAD_REQUEST]: {
						...ResponseWithStatusBadRequestSchema,
						description: `Validation errors (schema) or provided password doesn't match the user's password.
						In the latter case, \`${ErrorCode.USER_VALIDATION_PASSWORD_INCORRECT}\` code is provided in the
						\`errorCodes\` array. Otherwise the array is empty.`,
					},
					[ResponseStatus.NOT_FOUND]: {
						...ResponseWithStatusNotFound,
						description: "User with provided email doesn't exist.",
					},
					[ResponseStatus.INTERNAL_SERVER_ERROR]: ResponseWithStatusInternalServerErrorSchema,
				},
				summary: "Login a user",
				tags: [
					SchemaTag.AUTH,
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
				email,
				password,
			} = request.body;

			try {
				const userWithPassword = await prismaClient.user.findUnique({
					select: {
						id: true,
						password: true,
					},
					where: {
						email,
					},
				});

				if (isNull(userWithPassword)) {
					return await response
						.status(ResponseStatus.NOT_FOUND)
						.send({
							errorCodes: [
								ErrorCode.USER_NOT_FOUND_BY_EMAIL,
							],
						});
				}

				const {
					id,
					password: currentPassword,
				} = userWithPassword;

				const isPasswordCorrect = await verifyUserPassword(
					password,
					currentPassword,
				);

				if (!isPasswordCorrect) {
					return await response
						.status(ResponseStatus.BAD_REQUEST)
						.send({
							errorCodes: [
								ErrorCode.USER_VALIDATION_PASSWORD_INCORRECT,
							],
						});
				}

				const token = server.jwt.sign({
					payload: id,
				} satisfies JwtPayload);

				return await response
					.setCookie(
						COOKIE_JWT_TOKEN_NAME,
						token,
						{
							httpOnly: true,
							path: "/",
							sameSite: true,
						},
					)
					.status(ResponseStatus.OK)
					.send();
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
		Reply: undefined | ErrorResponse;
	}>(
		"/api/auth/logout",
		{
			schema: {
				description: `Removes "${COOKIE_JWT_TOKEN_NAME}" JWT cookie from headers.`,
				response: {
					[ResponseStatus.OK]: {
						description: "Empty response.",
						type: "null",
					},
					[ResponseStatus.INTERNAL_SERVER_ERROR]: ResponseWithStatusInternalServerErrorSchema,
				},
				summary: "Logout a user",
				tags: [
					SchemaTag.AUTH,
				],
			},
		},
		async (request, response) => {
			try {
				return await response
					.clearCookie(COOKIE_JWT_TOKEN_NAME)
					.status(ResponseStatus.OK)
					.send();
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

	done();
};

export {
	authRoutes,
};
