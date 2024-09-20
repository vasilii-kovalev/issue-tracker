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
	UserModel,
} from "@/models/users/model";
import {
	type User,
} from "@/models/users/types";
import {
	verifyUserPassword,
} from "@/models/users/utilities/verify-user-password";
import {
	SchemaId,
	SchemaTag,
} from "@/schemas/constants";
import {
	type ErrorResponse,
} from "@/types/errors";
import {
	isNull,
} from "@/utilities/is-null";

const authRoutes: FastifyPluginCallback = (server, options, done): void => {
	server.post<{
		Body: Pick<User, "email" | "password">;
		Reply: User | ErrorResponse;
	}>(
		"/api/auth/login",
		{
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
						$ref: SchemaId.ERROR_RESPONSE_WITH_MESSAGE,
						description: "Incorrect password",
					},
					[ResponseStatus.NOT_FOUND]: {
						$ref: SchemaId.ERROR_RESPONSE_WITH_MESSAGE,
						description: "User with provided email doesn't exist",
					},
					[ResponseStatus.INTERNAL_SERVER_ERROR]: {
						$ref: SchemaId.ERROR_RESPONSE_WITH_MESSAGE,
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
				email,
				password,
			} = request.body;

			try {
				const user = await UserModel.findOne({
					email,
				});

				if (isNull(user)) {
					return await response
						.status(ResponseStatus.NOT_FOUND)
						.send({
							message: `User with email "${email}" doesn't exist.`,
						});
				}

				const isPasswordCorrect = await verifyUserPassword(
					password,
					user.password,
				);

				if (!isPasswordCorrect) {
					return await response
						.status(ResponseStatus.BAD_REQUEST)
						.send({
							message: "Password is incorrect.",
						});
				}

				const token = server.jwt.sign({
					payload: user.toJSON(),
				});

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
				description: `Removes "${COOKIE_JWT_TOKEN_NAME}" JWT cookie in headers.`,
				response: {
					[ResponseStatus.OK]: {
						type: "null",
					},
					[ResponseStatus.INTERNAL_SERVER_ERROR]: {
						$ref: SchemaId.ERROR_RESPONSE_WITH_MESSAGE,
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
					});
			}
		},
	);

	done();
};

export {
	authRoutes,
};
