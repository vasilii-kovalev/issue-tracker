import {
	type FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";

import {
	isUndefined,
} from "@/utilities/is-undefined";

import {
	ResponseStatus,
	TechnicalErrorCode,
} from "../constants";
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

		if (error.status === ResponseStatus.BAD_REQUEST) {
			return TechnicalErrorCode.BAD_REQUEST;
		}

		return TechnicalErrorCode.SERVER_ERROR;
	}

	if (error.status === "FETCH_ERROR") {
		return TechnicalErrorCode.NO_INTERNET_CONNECTION;
	}

	return error.error;
};

export {
	getErrorMessage,
};
