import {
	isError,
} from "./is-error";

const logError = <ErrorType>(
	error: ErrorType,
): ErrorType => {
	if (isError(error)) {
		console.error(error);
	}

	return error;
};

export {
	logError,
};
