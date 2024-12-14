import {
	type PaginatedPage,
	type PaginatedPageQueryParams,
	type WithSortingString,
} from "./types";

const PaginatedPageParamsSchema = {
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
	} satisfies Record<keyof PaginatedPageQueryParams, unknown>,
	required: [
		"count",
		"pageNumber",
	] satisfies Array<keyof PaginatedPageQueryParams>,
	type: "object",
};

const WithSortingStringSchema = {
	properties: {
		sorting: {
			maxLength: 100,
			minLength: 1,
			type: "string",
		},
	} satisfies Record<keyof WithSortingString, unknown>,
	type: "object",
};

const PaginatedPageSchema = {
	properties: {
		data: {
			type: "array",
		},
		pagesTotalCount: {
			type: "number",
		},
	} satisfies Record<keyof PaginatedPage<unknown>, unknown>,
	required: [
		"data",
		"pagesTotalCount",
	] satisfies Array<keyof PaginatedPage<unknown>>,
	type: "object",
};

export {
	PaginatedPageParamsSchema,
	PaginatedPageSchema,
	WithSortingStringSchema,
};
