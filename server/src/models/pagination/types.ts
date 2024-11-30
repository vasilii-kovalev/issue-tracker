interface PaginatedPage<Entity> {
	data: Array<Entity>;
	pagesTotalCount: number;
}

interface PaginatedPageQueryParams {
	count: number;
	pageNumber: number;
}

export type {
	PaginatedPage,
	PaginatedPageQueryParams,
};
