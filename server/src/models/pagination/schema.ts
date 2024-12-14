const PaginatedPage = {
	properties: {
		data: {
			type: "array",
		},
		pagesTotalCount: {
			type: "number",
		},
	},
	required: [
		"data",
		"pagesTotalCount",
	],
	type: "object",
};

const WithPaginatedPageParamsSchema = {
	properties: {
		count: {
			maximum: 100,
			minimum: 1,
			type: "number",
		},
		pageNumber: {
			minimum: 1,
			type: "number",
		},
	},
	required: [
		"count",
		"pageNumber",
	],
	type: "object",
};

const WithSortingStringSchema = {
	properties: {
		sorting: {
			maxLength: 100,
			minLength: 1,
			type: "string",
		},
	},
	type: "object",
};

export {
	PaginatedPage,
	WithPaginatedPageParamsSchema,
	WithSortingStringSchema,
};
