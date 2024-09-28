interface ValidationError {
	message: string;
	path: string;
}

interface ErrorResponseWithMessage {
	message?: string;
}

interface ErrorResponseWithValidationErrors extends ErrorResponseWithMessage {
	validationErrors: Array<ValidationError>;
}

type ErrorResponse =
	| ErrorResponseWithValidationErrors
	| Required<ErrorResponseWithMessage>;

export type {
	ErrorResponse,
};
