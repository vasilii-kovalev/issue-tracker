import {
	isEmpty,
} from "./is-empty";
import {
	isString,
} from "./is-string";

const isError = (
	error: unknown,
): boolean => {
	return (
		error instanceof Error
		&& isString(error.message)
		&& !isEmpty(error.message)
	);
};

export {
	isError,
};
