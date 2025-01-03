// Inspired by: https://github.com/axios/axios/blob/v1.x/lib/helpers/HttpStatusCode.js
enum ResponseStatus {
	// Client error responses.
	BAD_REQUEST = 400,
	UNAUTHORIZED = 401,
	FORBIDDEN = 403,
	NOT_FOUND = 404,
	CONFLICT = 409,

	// Server error responses.
	INTERNAL_SERVER_ERROR = 500,
}

enum ErrorCode {
	// Users.
	USER_ACCESS_FORBIDDEN = "user.access.forbidden",
	USER_NOT_FOUND_BY_EMAIL = "user.notFound.byEmail",
	USER_NOT_FOUND_BY_ID = "user.notFound.byId",
	USER_VALIDATION_EMAIL_ALREADY_EXISTS = "user.validation.email.alreadyExists",
	USER_VALIDATION_NAME_ALREADY_EXISTS = "user.validation.name.alreadyExists",
	USER_VALIDATION_PASSWORD_INCORRECT = "user.validation.password.incorrect",
}

export {
	ErrorCode,
	ResponseStatus,
};
