import type mongoose from "mongoose";

import {
	type ResponseStatus,
} from "@/constants";

import {
	type ErrorCode,
} from "./constants";

type ValidationError = mongoose.Error.ValidationError;

interface ErrorResponse {
	status: ResponseStatus;
	code?: ErrorCode;
	entities?: Array<string>;
	message?: string;
}

export type {
	ErrorResponse,
	ValidationError,
};
