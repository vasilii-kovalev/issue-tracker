import cookie from "@fastify/cookie";
import jwt from "@fastify/jwt";
import Fastify from "fastify";
import mongoose from "mongoose";

import {
	authRoutes,
} from "@/routes/auth";
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

// Plugins.
void server.register(
	jwt,
	{
		cookie: {
			cookieName: "token",
			signed: false,
		},
		secret: process.env.JWT_SIGNING_SECRET ?? "secret",
	},
);

void server.register(cookie);

// Routes.
void server.register(
	usersRoutes,
	{
		prefix: "/api/users",
	},
);

void server.register(
	authRoutes,
	{
		prefix: "/api/auth",
	},
);

// Starting the server.
void server.listen({
	port: 5000,
});
