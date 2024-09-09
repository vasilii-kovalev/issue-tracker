import {
	type FastifyPluginCallback,
} from "fastify";

import {
	UserModel,
} from "@/models/users";

const usersRoutes: FastifyPluginCallback = (server, options, done): void => {
	server.get(
		"/",
		async (request, response) => {
			const users = await UserModel.find();

			void response.send(users);
		},
	);

	done();
};

export {
	usersRoutes,
};
