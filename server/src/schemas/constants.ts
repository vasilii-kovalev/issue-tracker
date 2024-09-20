enum SchemaId {
	// Errors.
	ERROR_RESPONSE_WITH_MESSAGE = "ErrorResponseWithMessage",
	ERROR_RESPONSE_WITH_VALIDATION_ERRORS = "ErrorResponseWithValidationErrors",

	// Users.
	USER = "User",
	USER_LOGIN = "UserLogin",
	USER_CREATE = "UserCreate",
	USER_UPDATE = "UserUpdate",
}

enum SchemaTag {
	AUTH = "auth",
	USERS = "users",
}

export {
	SchemaId,
	SchemaTag,
};
