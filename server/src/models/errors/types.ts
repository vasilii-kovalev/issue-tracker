import {
	type ResponseErrorCode,
} from "./constants";

interface ErrorResponse {
	errorCodes: Array<ResponseErrorCode>;
	message?: string;
}

export type {
	ErrorResponse,
};
