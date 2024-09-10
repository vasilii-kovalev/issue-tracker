import {
	type FastifyPluginCallback,
} from "fastify";
import mongoose from "mongoose";

import {
	ResponseStatus,
} from "@/constants";
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
		Reply: Array<User> | Error;
	}>(
		"/",
		async (request, response) => {
			try {
				const users = await UserModel.find();

				void response.status(ResponseStatus.Ok).send(users);
			} catch (error) {
				void response.status(ResponseStatus.InternalServerError).send(error as Error);
			}
		},
	);

	// Get user.
	server.get<{
		Params: {
			id: UserId;
		};
		Reply: User | Error;
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
					void response.status(ResponseStatus.BadRequest);

					return;
				}

				const user = await UserModel.findById(id);

				if (isNull(user)) {
					void response.status(ResponseStatus.NotFound);

					return;
				}

				void response.status(ResponseStatus.Ok).send(user);
			} catch (error) {
				void response.status(ResponseStatus.InternalServerError).send(error as Error);
			}
		},
	);

	// Create user.
	server.post<{
		Body: User;
		Reply: User | Error;
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

				void response.status(ResponseStatus.Created).send(user);
			} catch (error) {
				void response.status(ResponseStatus.InternalServerError).send(error as Error);
			}
		},
	);

	// Update user.
	server.patch<{
		Params: {
			id: UserId;
		};
		Body: Partial<User>;
		Reply: User | Error;
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
					void response.status(ResponseStatus.BadRequest);

					return;
				}

				const user = await UserModel.findById(id);

				if (isNull(user)) {
					void response.status(ResponseStatus.NotFound);

					return;
				}

				await user.updateOne({
					displayedName,
					email,
					password,
					userName,
				});

				void response.status(ResponseStatus.Ok).send(user);
			} catch (error) {
				void response.status(ResponseStatus.InternalServerError).send(error as Error);
			}
		},
	);

	// Delete user.
	server.delete<{
		Params: {
			id: UserId;
		};
		Reply: User | Error;
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
					void response.status(ResponseStatus.BadRequest);

					return;
				}

				const user = await UserModel.findById(id);

				if (isNull(user)) {
					void response.status(ResponseStatus.NotFound);

					return;
				}

				await user.deleteOne();

				void response.status(ResponseStatus.Ok).send(user);
			} catch (error) {
				void response.status(ResponseStatus.InternalServerError).send(error as Error);
			}
		},
	);

	done();
};

export {
	usersRoutes,
};
