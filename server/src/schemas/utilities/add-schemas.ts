import {
	type FastifyInstance,
} from "fastify";

import {
	ErrorResponseWithMessageSchema,
	ErrorResponseWithValidationErrorsSchema,
} from "@/models/errors/schema";
import {
	UserCreateSchema,
	UserLoginSchema,
	UserSchema,
	UserUpdateSchema,
} from "@/models/users/schema";

const addSchemas = (server: FastifyInstance): void => {
	// Errors.
	server.addSchema(ErrorResponseWithMessageSchema);

	server.addSchema(ErrorResponseWithValidationErrorsSchema);

	// Users.
	server.addSchema(UserLoginSchema);

	server.addSchema(UserCreateSchema);

	server.addSchema(UserUpdateSchema);

	server.addSchema(UserSchema);
};

export {
	addSchemas,
};
