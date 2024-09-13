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
					$ref: "UserLoginSchema",
				},
				description: `Sets "${COOKIE_JWT_TOKEN_NAME}" JWT cookie in headers.`,
				response: {
					// eslint-disable-next-line @typescript-eslint/naming-convention
					200: {
						type: "null",
					},
					// eslint-disable-next-line @typescript-eslint/naming-convention
					400: {
						$ref: "ErrorResponseWithMessageSchema",
						description: "Incorrect password",
					},
					// eslint-disable-next-line @typescript-eslint/naming-convention
					404: {
						$ref: "ErrorResponseWithMessageSchema",
						description: "User with provided email doesn't exist",
					},
					// eslint-disable-next-line @typescript-eslint/naming-convention
					500: {
						$ref: "ErrorResponseWithMessageSchema",
						description: "Internal server error",
					},
				},
				summary: "Login a user",
				tags: [
					"auth",
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
					// eslint-disable-next-line @typescript-eslint/naming-convention
					200: {
						type: "null",
					},
					// eslint-disable-next-line @typescript-eslint/naming-convention
					500: {
						$ref: "ErrorResponseWithMessageSchema",
						description: "Internal server error",
					},
				},
				summary: "Logout a user",
				tags: [
					"auth",
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
