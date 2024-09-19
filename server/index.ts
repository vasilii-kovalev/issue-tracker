import cookie from "@fastify/cookie";
import jwt from "@fastify/jwt";
import swagger from "@fastify/swagger";
import swaggerUi from "@fastify/swagger-ui";
import Fastify from "fastify";
import mongoose from "mongoose";

import {
	populateData,
} from "@/mocks/utilities/populate-data";
import {
	authRoutes,
} from "@/routes/auth";
import {
	usersRoutes,
} from "@/routes/users";
import {
	addSchemas,
} from "@/schemas/utilities/add-schemas";

// Connection to database.
mongoose.connect("mongodb://localhost:27017/issue-tracker")
	.then(() => {
		console.info("Connection to database is successful.");

		void populateData();
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

void server.register(
	swagger,
	{
		openapi: {
			/*
				Default version (2.0) doesn't support `oneOf`.
				Version 3.1.0 has the following issues:
				* `oneOf` doesn't render the schema names when `buildLocalReference` is defined
				* Array of schema doesn't render the schema name
			*/
			openapi: "3.0.0",
		},
		refResolver: {
			// eslint-disable-next-line @typescript-eslint/max-params
			buildLocalReference: (json, baseUri, fragment, index) => {
				return (
					json.$id
					?? `Unknown schema ${index}`
				) as string;
			},
		},
	},
);

void server.register(
	swaggerUi,
	{
		routePrefix: "/swagger",
	},
);

// Schemas.
addSchemas(server);

// Routes.
void server.register(authRoutes);

void server.register(usersRoutes);

// Starting the server.
void server.listen({
	port: 5000,
});
