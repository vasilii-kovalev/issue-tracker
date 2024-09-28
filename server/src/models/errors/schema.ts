import {
	SchemaId,
} from "@/constants/schemas";

const ErrorResponseSchema = {
	$id: SchemaId.ERROR_RESPONSE,
	properties: {
		message: {
			type: "string",
		},
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
		"message",
		"validationErrors",
	],
	type: "object",
};

export {
	ErrorResponseSchema,
};
