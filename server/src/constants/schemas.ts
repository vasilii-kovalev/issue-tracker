enum SchemaId {
	ERROR_RESPONSE = "ErrorResponse",
	PAGINATED_PAGE = "PaginatedPage",
	PERMISSION_FULL = "PermissionFull",
	PERMISSION_ID = "PermissionId",
	ROLE_FULL = "RoleFull",
	ROLE_ID = "RoleId",
	USER = "User",
	USER_CREATE = "UserCreate",
	USER_ID = "UserId",
	USER_LOGIN = "UserLogin",
	USER_UPDATE = "UserUpdate",
}

enum SchemaTag {
	AUTH = "Auth",
	ROLES_AND_PERMISSIONS = "Roles and permissions",
	USERS = "Users",
}

export {
	SchemaId,
	SchemaTag,
};
