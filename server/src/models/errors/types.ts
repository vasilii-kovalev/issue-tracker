import {
	type ResponseStatus,
} from "@/constants";

import {
	type ErrorCode,
} from "./constants";

interface ErrorResponse {
	status: ResponseStatus;
	code?: ErrorCode;
	entities?: Array<string>;
	message?: string;
}

export type {
	ErrorResponse,
};
