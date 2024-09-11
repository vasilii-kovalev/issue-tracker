import {
	type FastifyPluginCallback,
} from "fastify";

import {
	ResponseStatus,
} from "@/constants";
import {
	ErrorCode,
	type ResponseError,
} from "@/models/errors";
import {
	type User,
	UserModel,
	verifyPassword,
} from "@/models/users";
import {
	isNull,
} from "@/utilities/is-null";

const authRoutes: FastifyPluginCallback = (server, options, done): void => {
	server.post<{
		Body: Pick<User, "email" | "password">;
		Reply: User | ResponseError;
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

				const isPasswordCorrect = await verifyPassword(
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
						} satisfies ResponseError);
				}

				const token = server.jwt.sign({
					payload: user.toJSON(),
				});

				return await response
					.setCookie(
						"token",
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

	server.post<{
		Reply: undefined | ResponseError;
	}>(
		"/logout",
		async (request, response) => {
			try {
				return await response
					.clearCookie("token")
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
