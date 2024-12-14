interface PaginatedPage<Entity> {
	data: Array<Entity>;
	pagesTotalCount: number;
}

interface PaginatedPageQueryParams {
	count: number;
	pageNumber: number;
}

/** Format: `<field1>:<order>;<field2>:<order>` */
type SortingString = string;

interface WithSortingString {
	sorting: SortingString;
}

export type {
	PaginatedPage,
	PaginatedPageQueryParams,
	SortingString,
	WithSortingString,
};
