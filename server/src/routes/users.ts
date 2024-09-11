import {
	type FastifyPluginCallback,
} from "fastify";
import mongoose from "mongoose";

import {
	ResponseStatus,
} from "@/constants";
import {
	ErrorCode,
	type ResponseError,
} from "@/models/errors";
import {
	type User,
	type UserId,
	UserModel,
} from "@/models/users";
import {
	isNull,
} from "@/utilities/is-null";

const usersRoutes: FastifyPluginCallback = (server, options, done): void => {
	// Get users.
	server.get<{
		Reply: Array<User> | ResponseError;
	}>(
		"/",
		async (request, response) => {
			try {
				const users = await UserModel.find();

				return await response
					.status(ResponseStatus.OK)
					.send(users);
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

	// Get user.
	server.get<{
		Params: {
			id: UserId;
		};
		Reply: User | ResponseError;
	}>(
		"/:id",
		async (request, response) => {
			try {
				const {
					params: {
						id,
					},
				} = request;

				const isValidId = mongoose.isValidObjectId(id);

				if (!isValidId) {
					const status = ResponseStatus.BAD_REQUEST;

					return await response
						.status(status)
						.send({
							code: ErrorCode.BAD_REQUEST,
							entities: [
								"id",
							],
							status,
						});
				}

				const user = await UserModel.findById(id);

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

				return await response
					.status(ResponseStatus.OK)
					.send(user);
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

	// Create user.
	server.post<{
		Body: User;
		Reply: User | ResponseError;
	}>(
		"/create",
		async (request, response) => {
			try {
				const {
					body: {
						displayedName,
						email,
						password,
						userName,
					},
				} = request;

				const user = new UserModel({
					displayedName,
					email,
					password,
					userName,
				});

				const [
					userWithRequestEmail,
					userWithRequestUserName,
				] = await Promise.all([
					UserModel.findOne({
						email,
					}),
					UserModel.findOne({
						userName,
					}),
				]);

				const errorEntities: Array<string> = [];

				if (!isNull(userWithRequestEmail)) {
					errorEntities.push("email");
				}

				if (!isNull(userWithRequestUserName)) {
					errorEntities.push("userName");
				}

				if (errorEntities.length > 0) {
					const status = ResponseStatus.BAD_REQUEST;

					return await response
						.status(status)
						.send({
							code: ErrorCode.DUPLICATE_FIELD,
							entities: errorEntities,
							status,
						});
				}

				await user.save();

				return await response
					.status(ResponseStatus.CREATED)
					.send(user);
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

	// Update user.
	server.patch<{
		Params: {
			id: UserId;
		};
		Body: Partial<User>;
		Reply: User | ResponseError;
	}>(
		"/update/:id",
		async (request, response) => {
			try {
				const {
					params: {
						id,
					},
					body: {
						displayedName,
						email,
						password,
						userName,
					},
				} = request;

				const isValidId = mongoose.isValidObjectId(id);

				if (!isValidId) {
					const status = ResponseStatus.BAD_REQUEST;

					return await response
						.status(status)
						.send({
							code: ErrorCode.BAD_REQUEST,
							entities: [
								"id",
							],
							status,
						});
				}

				const user = await UserModel.findById(id);

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

				await user.updateOne({
					displayedName,
					email,
					password,
					userName,
				});

				return await response
					.status(ResponseStatus.OK)
					.send(user);
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

	// Delete user.
	server.delete<{
		Params: {
			id: UserId;
		};
		Reply: User | ResponseError;
	}>(
		"/delete/:id",
		async (request, response) => {
			try {
				const {
					params: {
						id,
					},
				} = request;

				const isValidId = mongoose.isValidObjectId(id);

				if (!isValidId) {
					const status = ResponseStatus.BAD_REQUEST;

					return await response
						.status(status)
						.send({
							code: ErrorCode.BAD_REQUEST,
							entities: [
								"id",
							],
							status,
						});
				}

				const user = await UserModel.findById(id);

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

				await user.deleteOne();

				return await response
					.status(ResponseStatus.OK)
					.send(user);
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
	usersRoutes,
};
