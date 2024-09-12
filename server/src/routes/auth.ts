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
