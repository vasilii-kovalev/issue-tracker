import {
	array,
	enum_,
	object,
} from "valibot";

import {
	ErrorCode,
} from "./constants";

const ErrorCodeSchema = enum_(ErrorCode);

const ErrorResponseSchema = object({
	errorCodes: array(ErrorCodeSchema),
});

export {
	ErrorResponseSchema,
};
