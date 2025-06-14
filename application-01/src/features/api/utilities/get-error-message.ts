import {
	type FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";

import {
	isUndefined,
} from "@/utilities/is-undefined";

import {
	type ErrorResponse,
} from "../types";

const getErrorMessage = (
	error: FetchBaseQueryError | Error,
): string => {
	if ("message" in error) {
		return error.message;
	}

	if ("data" in error) {
		const typedData = (error.data) as ErrorResponse | null;
		const firstErrorCode = typedData?.errorCodes.at(0);

		if (!isUndefined(firstErrorCode)) {
			return firstErrorCode;
		}

		return "The server is currently unavailable. Please try again later.";
	}

	if (error.status === "FETCH_ERROR") {
		return "No internet connection detected. Please reconnect and try again.";
	}

	return error.error;
};

export {
	getErrorMessage,
};
