enum PermissionId {
	CAN_MANAGE_USERS = "can-manage-users",
}

enum RoleId {
	ADMIN = "admin",
	USER = "user",
}

const ROLES = Object.values(RoleId);

const ROLE_TO_PERMISSIONS_MAP: Record<RoleId, Array<PermissionId>> = {
	[RoleId.ADMIN]: [
		PermissionId.CAN_MANAGE_USERS,
	],
	[RoleId.USER]: [],
};

export {
	PermissionId,
	ROLE_TO_PERMISSIONS_MAP,
	RoleId,
	ROLES,
};
