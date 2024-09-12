import type mongoose from "mongoose";

type MongooseValidationError = mongoose.Error.ValidationError;

interface ValidationError {
	entity: string;
	message: string;
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
	MongooseValidationError,
};
