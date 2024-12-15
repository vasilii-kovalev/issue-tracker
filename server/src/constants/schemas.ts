enum SchemaId {
	ERROR_RESPONSE = "ErrorResponse",
	PAGINATED_PAGE = "PaginatedPage",
	ROLE = "Role",
	ROLE_ID = "RoleId",
	USER = "User",
	USER_CREATE = "UserCreate",
	USER_LOGIN = "UserLogin",
	USER_UPDATE = "UserUpdate",
}

enum SchemaTag {
	AUTH = "Auth",
	ROLES = "Roles",
	USERS = "Users",
}

export {
	SchemaId,
	SchemaTag,
};
