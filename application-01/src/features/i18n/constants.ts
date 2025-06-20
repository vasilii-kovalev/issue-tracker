enum ValidationErrorCode {
	USER_VALIDATION_EMAIL_EMPTY = "user.validation.email.empty",
	USER_VALIDATION_EMAIL_INCORRECT = "user.validation.email.incorrect",
	USER_VALIDATION_NAME_EMPTY = "user.validation.name.empty",
	USER_VALIDATION_NAME_LENGTH_MIN = "user.validation.name.length.min",
	USER_VALIDATION_NAME_LENGTH_MAX = "user.validation.name.length.max",
	USER_VALIDATION_PASSWORD_EMPTY = "user.validation.password.empty",
	USER_VALIDATION_PASSWORD_LENGTH_MIN = "user.validation.password.length.min",
	USER_VALIDATION_PASSWORD_LENGTH_MAX = "user.validation.password.length.max",
}

export {
	ValidationErrorCode,
};
