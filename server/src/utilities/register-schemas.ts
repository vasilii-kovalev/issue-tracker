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
	PermissionFillSchema,
} from "@/models/permissions/schemas";
import {
	RoleFullSchema,
} from "@/models/roles/schemas";
import {
	UserCreateSchema,
	UserLoginSchema,
	UserSchema,
	UserUpdateSchema,
} from "@/models/users/schemas";

const registerSchemas = (server: FastifyInstance): void => {
	server.addSchema(ErrorResponseSchema);

	server.addSchema(PaginatedPageSchema);

	server.addSchema(PermissionFillSchema);

	server.addSchema(RoleFullSchema);

	server.addSchema(UserSchema);

	server.addSchema(UserCreateSchema);

	server.addSchema(UserLoginSchema);

	server.addSchema(UserUpdateSchema);
};

export {
	registerSchemas,
};
