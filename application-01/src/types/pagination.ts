interface PaginatedPage<Entity> {
	data: Array<Entity>;
	pagesTotalCount: number;
}

export type {
	PaginatedPage,
};
