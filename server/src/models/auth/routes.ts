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
	type ErrorResponse,
} from "@/models/errors/types";
import {
	USER_SELECTOR,
} from "@/models/users/selectors";
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

const authRoutes: FastifyPluginCallback = (server, options, done): void => {
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
						type: "null",
					},
					[ResponseStatus.BAD_REQUEST]: {
						$ref: SchemaId.ERROR_RESPONSE,
						description: "Incorrect password",
					},
					[ResponseStatus.NOT_FOUND]: {
						$ref: SchemaId.ERROR_RESPONSE,
						description: "User with provided email doesn't exist",
					},
					[ResponseStatus.INTERNAL_SERVER_ERROR]: {
						$ref: SchemaId.ERROR_RESPONSE,
						description: "Internal server error",
					},
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
						message: validationError.message,
						validationErrors: [],
					});
			}

			const {
				email,
				password,
			} = request.body;

			try {
				const userWithPassword = await prismaClient.user.findUnique({
					select: {
						...USER_SELECTOR,
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
							message: `User with email "${email}" doesn't exist.`,
							validationErrors: [],
						});
				}

				const {
					password: userPassword,
					...user
				} = userWithPassword;

				const isPasswordCorrect = await verifyUserPassword(
					password,
					userPassword,
				);

				if (!isPasswordCorrect) {
					return await response
						.status(ResponseStatus.BAD_REQUEST)
						.send({
							message: "Password is incorrect.",
							validationErrors: [
								{
									message: "Password is incorrect.",
									path: "body.password",
								},
							],
						});
				}

				const token = server.jwt.sign({
					payload: user,
				} satisfies JwtPayload);

				return await response
					.setCookie(
						COOKIE_JWT_TOKEN_NAME,
						token,
						{
							path: "/",
						},
					)
					.status(ResponseStatus.OK)
					.send();
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
		Reply: undefined | ErrorResponse;
	}>(
		"/api/auth/logout",
		{
			attachValidation: true,
			schema: {
				description: `Removes "${COOKIE_JWT_TOKEN_NAME}" JWT cookie in headers.`,
				response: {
					[ResponseStatus.OK]: {
						type: "null",
					},
					[ResponseStatus.INTERNAL_SERVER_ERROR]: {
						$ref: SchemaId.ERROR_RESPONSE,
						description: "Internal server error",
					},
				},
				summary: "Logout a user",
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
						message: validationError.message,
						validationErrors: [],
					});
			}

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
						message: typedError.message,
						validationErrors: [],
					});
			}
		},
	);

	done();
};

export {
	authRoutes,
};
