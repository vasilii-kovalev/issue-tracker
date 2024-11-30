interface ValidationError {
	message: string;
	path: string;
}

interface ErrorResponse {
	message: string;
	validationErrors: Array<ValidationError>;
}

export type {
	ErrorResponse,
};
