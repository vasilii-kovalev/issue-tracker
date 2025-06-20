import {
	type InferOutput,
} from "valibot";

import {
	type getPaginatedPageSchema,
} from "./schemas";

type PaginatedPage = InferOutput<ReturnType<typeof getPaginatedPageSchema>>;

interface PaginatedPageGeneric<Type> extends
	Omit<
		PaginatedPage,
		"data"
	> {
	data: Array<Type>;
}

export {
	type PaginatedPageGeneric as PaginatedPage,
};
