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
	ErrorCode,
} from "@/models/errors/constants";
import {
	type ErrorResponse,
} from "@/models/errors/types";
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
	isNull,
} from "@/utilities/is-null";

const authRoutes: FastifyPluginCallback = (server, options, done): void => {
	// Login a user.
	server.post<{
		Body: Pick<User, "email" | "password">;
		Reply: User | ErrorResponse;
	}>(
		"/login",
		async (request, response) => {
			try {
				const {
					email,
					password,
				} = request.body;

				const user = await UserModel.findOne({
					email,
				});

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

				const isPasswordCorrect = await verifyUserPassword(
					password,
					user.password,
				);

				if (!isPasswordCorrect) {
					const status = ResponseStatus.BAD_REQUEST;

					return await response
						.status(status)
						.send({
							code: ErrorCode.BAD_REQUEST,
							entities: [
								"password",
							],
							status,
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

	// Logout a user.
	server.post<{
		Reply: undefined | ErrorResponse;
	}>(
		"/logout",
		async (request, response) => {
			try {
				return await response
					.clearCookie(COOKIE_JWT_TOKEN_NAME)
					.status(ResponseStatus.OK)
					.send();
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
	authRoutes,
};
