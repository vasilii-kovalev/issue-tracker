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

				void response
					.status(ResponseStatus.OK)
					.send(users);
			} catch (error) {
				const typedError = error as Error;
				const status = ResponseStatus.INTERNAL_SERVER_ERROR;

				void response
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

					void response
						.status(status)
						.send({
							code: ErrorCode.BAD_REQUEST,
							entities: [
								"id",
							],
							status,
						});

					return;
				}

				const user = await UserModel.findById(id);

				if (isNull(user)) {
					const status = ResponseStatus.NOT_FOUND;

					void response
						.status(status)
						.send({
							code: ErrorCode.NOT_FOUND,
							entities: [
								"user",
							],
							status,
						});

					return;
				}

				void response
					.status(ResponseStatus.OK)
					.send(user);
			} catch (error) {
				const typedError = error as Error;
				const status = ResponseStatus.INTERNAL_SERVER_ERROR;

				void response
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

				await user.save();

				void response
					.status(ResponseStatus.CREATED)
					.send(user);
			} catch (error) {
				const typedError = error as Error;
				const status = ResponseStatus.INTERNAL_SERVER_ERROR;

				void response
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

					void response
						.status(status)
						.send({
							code: ErrorCode.BAD_REQUEST,
							entities: [
								"id",
							],
							status,
						});

					return;
				}

				const user = await UserModel.findById(id);

				if (isNull(user)) {
					const status = ResponseStatus.NOT_FOUND;

					void response
						.status(status)
						.send({
							code: ErrorCode.NOT_FOUND,
							entities: [
								"user",
							],
							status,
						});

					return;
				}

				await user.updateOne({
					displayedName,
					email,
					password,
					userName,
				});

				void response
					.status(ResponseStatus.OK)
					.send(user);
			} catch (error) {
				const typedError = error as Error;
				const status = ResponseStatus.INTERNAL_SERVER_ERROR;

				void response
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

					void response
						.status(status)
						.send({
							code: ErrorCode.BAD_REQUEST,
							entities: [
								"id",
							],
							status,
						});

					return;
				}

				const user = await UserModel.findById(id);

				if (isNull(user)) {
					const status = ResponseStatus.NOT_FOUND;

					void response
						.status(status)
						.send({
							code: ErrorCode.NOT_FOUND,
							entities: [
								"user",
							],
							status,
						});

					return;
				}

				await user.deleteOne();

				void response
					.status(ResponseStatus.OK)
					.send(user);
			} catch (error) {
				const typedError = error as Error;
				const status = ResponseStatus.INTERNAL_SERVER_ERROR;

				void response
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
