import {
	flavor,
	isoDate,
	pipe,
	string,
} from "valibot";

const DateStringSchema = pipe(
	string(),
	isoDate(),
	flavor("date-string"),
);

export {
	DateStringSchema,
};
