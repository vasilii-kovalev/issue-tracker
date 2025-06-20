import {
	flavor,
	isoDate,
	nonEmpty,
	pipe,
	string,
} from "valibot";

const DateStringSchema = pipe(
	string(),
	nonEmpty(),
	isoDate(),
	flavor("date-string"),
);

export {
	DateStringSchema,
};
