import {
	type ErrorCode,
} from "./constants";

interface ErrorResponse {
	errorCodes: Array<ErrorCode>;
	message?: string;
}

export type {
	ErrorResponse,
};
