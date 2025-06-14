interface PaginatedPage<Type> {
	data: Array<Type>;
	pagesTotalCount: number;
}

export type {
	PaginatedPage,
};
