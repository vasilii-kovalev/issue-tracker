import {
	SchemaId,
} from "@/constants/schemas";

const PaginatedPage = {
	properties: {
		data: {
			type: "array",
		},
		itemsCount: {
			type: "number",
		},
		pagesTotalCount: {
			type: "number",
		},
	},
	required: [
		"itemsCount",
		"data",
		"pagesTotalCount",
	],
	type: "object",
};

const PaginatedPageQueryParamsSchema = {
	$id: SchemaId.PAGINATION_PAGE_QUERY_PARAMS,
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

export {
	PaginatedPage,
	PaginatedPageQueryParamsSchema,
};
