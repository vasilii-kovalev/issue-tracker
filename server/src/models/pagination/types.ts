interface PaginatedPage<Entity> {
	data: Array<Entity>;
	itemsCount: number;
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
