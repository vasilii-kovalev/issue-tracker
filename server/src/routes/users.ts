import { UserModel } from "../models/user";
import { UseRoutes } from "../types/server";

const useUsersRoutes: UseRoutes = (server): void => {
	server.get("/api/users", async (request, response) => {
		const users = await UserModel.find();

		response.send(users);
	});
};

export {
	useUsersRoutes,
}
