interface PaginatedPage<Entity> {
	data: Array<Entity>;
	itemsCount: number;
	pagesTotalCount: number;
}

export type {
	PaginatedPage,
};
