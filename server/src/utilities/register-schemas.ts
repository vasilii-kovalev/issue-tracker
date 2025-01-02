import {
	type FastifyInstance,
} from "fastify";

import {
	ErrorResponseSchema,
} from "@/models/errors/schema";
import {
	PaginatedPageSchema,
} from "@/models/pagination/schema";
import {
	RoleIdSchema,
	RoleSchema,
} from "@/models/roles/schemas";
import {
	UserCreateSchema,
	UserLoginSchema,
	UserSchema,
	UserUpdateSchema,
} from "@/models/users/schemas";

const registerSchemas = (
	server: FastifyInstance,
): void => {
	server.addSchema(ErrorResponseSchema);

	server.addSchema(PaginatedPageSchema);

	server.addSchema(RoleSchema);

	server.addSchema(RoleIdSchema);

	server.addSchema(UserSchema);

	server.addSchema(UserCreateSchema);

	server.addSchema(UserLoginSchema);

	server.addSchema(UserUpdateSchema);
};

export {
	registerSchemas,
};
