import {
	array,
	enum_,
	object,
} from "valibot";

import {
	ResponseErrorCode,
} from "./constants";

const ErrorCodeSchema = enum_(ResponseErrorCode);

const ErrorResponseSchema = object({
	errorCodes: array(ErrorCodeSchema),
});

export {
	ErrorResponseSchema,
};
