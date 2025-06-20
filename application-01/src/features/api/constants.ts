// Inspired by: https://github.com/axios/axios/blob/v1.x/lib/helpers/HttpStatusCode.js
enum ResponseStatus {
	// Client error responses.
	BAD_REQUEST = 400,
	UNAUTHORIZED = 401,
	FORBIDDEN = 403,
	NOT_FOUND = 404,
}

enum TechnicalErrorCode {
	BAD_REQUEST = "technical.badRequest",
	SERVER_ERROR = "technical.serverError",
	NO_INTERNET_CONNECTION = "technical.noInternetConnection",
}

enum ResponseErrorCode {
	// Users.
	USER_ACCESS_FORBIDDEN = "user.accessForbidden",
	USER_NOT_FOUND_BY_EMAIL = "user.notFound.byEmail",
	USER_NOT_FOUND_BY_ID = "user.notFound.byId",
	USER_VALIDATION_EMAIL_ALREADY_EXISTS = "user.validation.email.alreadyExists",
	USER_VALIDATION_NAME_ALREADY_EXISTS = "user.validation.name.alreadyExists",
	USER_VALIDATION_PASSWORD_INCORRECT = "user.validation.password.incorrect",
}

export {
	ResponseErrorCode,
	ResponseStatus,
	TechnicalErrorCode,
};
