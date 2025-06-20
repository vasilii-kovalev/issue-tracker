import {
	SchemaId,
} from "@/constants/schemas";

import {
	ResponseErrorCode,
} from "./constants";
import {
	type ErrorResponse,
} from "./types";

const ErrorResponseSchema = {
	$id: SchemaId.ERROR_RESPONSE,
	properties: {
		errorCodes: {
			items: {
				enum: Object.values(ResponseErrorCode),
				type: "string",
			},
			type: "array",
			uniqueItems: true,
		},
		message: {
			description: "Server and database errors. Present for debugging purposes only",
			type: "string",
		},
	} satisfies Record<keyof ErrorResponse, unknown>,
	required: [
		"errorCodes",
	] satisfies Array<keyof ErrorResponse>,
	type: "object",
};

const ResponseWithStatusBadRequestSchema = {
	$ref: SchemaId.ERROR_RESPONSE,
	description: "Validation errors (schema). The `errorCodes` array is empty.",
};

const ResponseWithStatusUnauthorized = {
	description: "Unauthorized access.",
	type: "null",
};

const ResponseWithStatusForbidden = {
	description: "Forbidden access.",
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
