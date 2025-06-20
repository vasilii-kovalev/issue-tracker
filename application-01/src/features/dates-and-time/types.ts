import {
	type InferOutput,
} from "valibot";

import {
	type DateStringSchema,
} from "./schemas";

/**
 * `full-date` according to {@link https://datatracker.ietf.org/doc/html/rfc3339#section-5.6 RFC3339}
 */
type DateString = InferOutput<typeof DateStringSchema>;

export {
	type DateString,
};
