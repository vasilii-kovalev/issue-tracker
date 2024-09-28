interface PaginatedPage<Entity> {
	data: Array<Entity>;
	itemsCount: number;
	pagesTotalCount: number;
}

interface PaginatedPageQueryParams {
	count: string;
	pageNumber: string;
}

export type {
	PaginatedPage,
	PaginatedPageQueryParams,
};
