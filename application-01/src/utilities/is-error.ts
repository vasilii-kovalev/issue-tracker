import {
	isEmpty,
} from "./is-empty";

const isError = (error: unknown): boolean => {
	return (
		error instanceof Error
		&& typeof error.message === "string"
		&& !isEmpty(error.message)
	);
};

export {
	isError,
};
