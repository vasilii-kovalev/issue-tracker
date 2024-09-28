type SortingOptions<Entity> = Partial<
	Record<
		keyof Entity,
		// https://mongoosejs.com/docs/api/query.html#Query.prototype.sort()
		| "asc"
		| "desc"
		| "ascending"
		| "descending"
		| 1
		| -1
	>
>;

export type {
	SortingOptions,
};
