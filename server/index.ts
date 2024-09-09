import Fastify from "fastify";
import mongoose from "mongoose";

import {
	usersRoutes,
} from "./src/routes/users";

// Connection to database.
mongoose.connect("mongodb://localhost:27017/issue-tracker")
	.then(() => {
		console.info("Connection to database is successful.");
	})
	.catch((error) => {
		console.error(error);
	});

// Creation of server.
const server = Fastify({
	logger: true,
});

// Routes.
server.register(
	usersRoutes,
	{
		prefix: "/api/users",
	},
);

// Starting the server.
server.listen({
	port: 5000,
});
