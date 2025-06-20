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
};
