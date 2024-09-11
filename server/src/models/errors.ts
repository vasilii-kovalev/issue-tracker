import {
	type ResponseStatus,
} from "@/constants";

enum ErrorCode {
	BAD_REQUEST = "errors.badRequest",
	DUPLICATE_FIELD = "errors.duplicateField",
	INTERNAL_SERVER_ERROR = "errors.internalServerError",
	NOT_FOUND = "errors.notFound",
	UNAUTHORIZED = "errors.unauthorized",
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
