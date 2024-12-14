enum SchemaId {
	// Users.
	USER = "User",
	USER_LOGIN = "UserLogin",
	USER_CREATE = "UserCreate",
	USER_UPDATE = "UserUpdate",
	USERS_PAGINATED_PAGE = "UsersPaginatedPage",

	// Errors.
	ERROR_RESPONSE = "ErrorResponse",
}

enum SchemaTag {
	AUTH = "Auth",
	USERS = "Users",
}

export {
	SchemaId,
	SchemaTag,
};
