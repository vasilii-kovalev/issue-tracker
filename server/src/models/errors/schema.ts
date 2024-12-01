import {
	SchemaId,
} from "@/constants/schemas";

import {
	ErrorCode,
} from "./constants";

const ErrorResponseSchema = {
	$id: SchemaId.ERROR_RESPONSE,
	properties: {
		errorCodes: {
			items: {
				enum: Object.values(ErrorCode),
				type: "string",
			},
			type: "array",
		},
		message: {
			description: "Server and database errors. Present for debugging purposes only",
			type: "string",
		},
	},
	required: [
		"errorCodes",
	],
	type: "object",
};

const ResponseWithStatusBadRequestSchema = {
	$ref: SchemaId.ERROR_RESPONSE,
	description: "Validation errors (schema). The `errorCodes` array is empty.",
};

const ResponseWithStatusUnauthorized = {
	description: "Unauthorized.",
	type: "null",
};

const ResponseWithStatusForbidden = {
	description: "Forbidden by permissions.",
	type: "null",
};

const ResponseWithStatusNotFound = {
	$ref: SchemaId.ERROR_RESPONSE,
};

const ResponseWithStatusConflict = {
	$ref: SchemaId.ERROR_RESPONSE,
};

const ResponseWithStatusInternalServerErrorSchema = {
	$ref: SchemaId.ERROR_RESPONSE,
	description: "Internal server error. The `errorCodes` array is empty.",
};

export {
	ErrorResponseSchema,
	ResponseWithStatusBadRequestSchema,
	ResponseWithStatusConflict,
	ResponseWithStatusForbidden,
	ResponseWithStatusInternalServerErrorSchema,
	ResponseWithStatusNotFound,
	ResponseWithStatusUnauthorized,
};
