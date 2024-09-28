enum SchemaId {
	// Users.
	USER = "User",
	USER_LOGIN = "UserLogin",
	USER_CREATE = "UserCreate",
	USER_UPDATE = "UserUpdate",
	USERS_PAGINATED_PAGE = "UsersPaginatedPage",

	// Errors.
	ERROR_RESPONSE = "ErrorResponse",

	// Pagination.
	PAGINATION_PAGE_QUERY_PARAMS = "PaginationPageQueryParams",
}

enum SchemaTag {
	AUTH = "auth",
	USERS = "users",
}

export {
	SchemaId,
	SchemaTag,
};
