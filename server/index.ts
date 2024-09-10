import Fastify from "fastify";
import mongoose from "mongoose";

import {
	usersRoutes,
} from "@/routes/users";

// Connection to database.
mongoose.connect("mongodb://localhost:27017/issue-tracker")
	.then(() => {
		console.info("Connection to database is successful.");
	})
	.catch((error) => {
		console.error(error);
	});

// Creation of server.
// eslint-disable-next-line new-cap
const server = Fastify({
	logger: {
		level: "error",
	},
});

// Routes.
void server.register(
	usersRoutes,
	{
		prefix: "/api/users",
	},
);

// Starting the server.
void server.listen({
	port: 5000,
});
