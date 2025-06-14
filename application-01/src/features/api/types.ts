import {
	type ErrorCode,
} from "./constants";

interface ErrorResponse {
	errorCodes: Array<ErrorCode>;
}

export type {
	ErrorResponse,
};
