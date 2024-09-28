import type mongoose from "mongoose";

type MongooseValidationError = mongoose.Error.ValidationError;

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
	MongooseValidationError,
	ValidationError,
};
