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
			type: "number",
		},
		pageNumber: {
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
