import {
	type FastifyInstance,
} from "fastify";

import {
	ErrorResponseWithMessageSchema,
	ErrorResponseWithValidationErrorsSchema,
} from "@/models/errors/schema";
import {
	PaginatedPageQueryParamsSchema,
} from "@/models/pagination/schema";
import {
	UserCreateSchema,
	UserLoginSchema,
	UserSchema,
	UsersPaginatedPageSchema,
	UserUpdateSchema,
} from "@/models/users/schema";

const addSchemas = (server: FastifyInstance): void => {
	// Users.
	server.addSchema(UserSchema);

	server.addSchema(UserLoginSchema);

	server.addSchema(UserCreateSchema);

	server.addSchema(UserUpdateSchema);

	server.addSchema(UsersPaginatedPageSchema);

	// Errors.
	server.addSchema(ErrorResponseWithMessageSchema);

	server.addSchema(ErrorResponseWithValidationErrorsSchema);

	// Pagination.
	server.addSchema(PaginatedPageQueryParamsSchema);
};

export {
	addSchemas,
};
