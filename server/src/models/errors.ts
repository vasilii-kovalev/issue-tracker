import {
	type ResponseStatus,
} from "@/constants";

enum ErrorCode {
	INTERNAL_SERVER_ERROR = "errors.internalServerError",
	BAD_REQUEST = "errors.badRequest",
	NOT_FOUND = "errors.notFound",
}

interface ResponseError {
	status: ResponseStatus;
	code?: ErrorCode;
	entities?: Array<string>;
	message?: string;
}

export {
	ErrorCode,
	type ResponseError,
};
