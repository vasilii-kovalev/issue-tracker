import {
	array,
	type GenericSchema,
	integer,
	number,
	object,
	pipe,
} from "valibot";

const getPaginatedPageSchema = <
	DataSchema extends GenericSchema,
>(
	data: DataSchema,
) => {
	return object({
		data: array(data),
		totalCount: pipe(
			number(),
			integer(),
		),
	});
};

export {
	getPaginatedPageSchema,
};
