import {
	type InferOutput,
} from "valibot";

import {
	type ErrorResponseSchema,
} from "./schemas";

type ErrorResponse = InferOutput<typeof ErrorResponseSchema>;

export {
	type ErrorResponse,
};
