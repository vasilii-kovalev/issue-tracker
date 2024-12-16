interface PaginatedPageQueryParams {
	count: number;
	pageNumber: number;
}

/** Format: `field1:asc|desc;field2:asc|desc;...`. */
type SortingString = string;

interface WithSortingString {
	sorting: SortingString;
}

interface PaginatedPage<Type> {
	data: Array<Type>;
	pagesTotalCount: number;
}

export type {
	PaginatedPage,
	PaginatedPageQueryParams,
	SortingString,
	WithSortingString,
};
