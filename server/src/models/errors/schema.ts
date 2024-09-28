import {
	SchemaId,
} from "@/constants/schemas";

const ErrorResponseCommon = {
	properties: {
		message: {
			type: "string",
		},
	},
	type: "object",
};

const ErrorResponseWithMessageSchema = {
	...ErrorResponseCommon,
	$id: SchemaId.ERROR_RESPONSE_WITH_MESSAGE,
	required: [
		"message",
	],
};

const ErrorResponseWithValidationErrorsSchema = {
	...ErrorResponseCommon,
	$id: SchemaId.ERROR_RESPONSE_WITH_VALIDATION_ERRORS,
	properties: {
		...ErrorResponseCommon.properties,
		validationErrors: {
			items: {
				properties: {
					message: {
						type: "string",
					},
					path: {
						type: "string",
					},
				},
				required: [
					"message",
					"path",
				],
				type: "object",
			},
			type: "array",
		},
	},
	required: [
		"validationErrors",
	],
};

export {
	ErrorResponseWithMessageSchema,
	ErrorResponseWithValidationErrorsSchema,
};
