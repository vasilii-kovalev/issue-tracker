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
	$id: "ErrorResponseWithMessageSchema",
	required: [
		"message",
	],
};

const ErrorResponseWithValidationErrorsSchema = {
	...ErrorResponseCommon,
	$id: "ErrorResponseWithValidationErrorsSchema",
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
