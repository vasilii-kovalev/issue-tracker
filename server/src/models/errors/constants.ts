enum ErrorCode {
	// Common.
	BAD_REQUEST = "errors.badRequest",
	DUPLICATE_FIELD = "errors.duplicateField",
	INTERNAL_SERVER_ERROR = "errors.internalServerError",
	NOT_FOUND = "errors.notFound",
	UNAUTHORIZED = "errors.unauthorized",

	// Users.
	USERS_DISPLAYED_NAME_REQUIRED = "errors.users.displayedName.required",
	USERS_DISPLAYED_EMAIL_MIN_LENGTH = "errors.users.email.minLength",
	USERS_DISPLAYED_EMAIL_REQUIRED = "errors.users.email.required",
	USERS_DISPLAYED_PASSWORD_MIN_LENGTH = "errors.users.password.minLength",
	USERS_DISPLAYED_PASSWORD_REQUIRED = "errors.users.password.required",
	USERS_ROLES_EMPTY = "errors.users.roles.empty",
	USERS_ROLES_INVALID = "errors.users.roles.invalid",
	USERS_ROLES_REQUIRED = "errors.users.roles.required",
	USERS_USER_NAME_NOT_UNIQUE = "errors.users.userName.notUnique",
	USERS_USER_NAME_REQUIRED = "errors.users.userName.required",
}

export {
	ErrorCode,
};
