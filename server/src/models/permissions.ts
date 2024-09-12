import {
	type onRequestAsyncHookHandler,
} from "fastify";

import {
	ResponseStatus,
} from "@/constants";
import {
	isNull,
} from "@/utilities/is-null";

import {
	getUserIdFromJwtCookie,
} from "./auth";
import {
	type UserId,
	UserModel,
} from "./users";

enum PermissionId {
	CAN_MANAGE_USERS = "can-manage-users",
}

enum RoleId {
	ADMIN = "admin",
	USER = "user",
}

const ROLE_TO_PERMISSIONS_MAP: Record<RoleId, Array<PermissionId>> = {
	[RoleId.ADMIN]: [
		PermissionId.CAN_MANAGE_USERS,
	],
	[RoleId.USER]: [],
};

const hasPermissions = async (
	userId: UserId | undefined,
	permissions: Array<PermissionId>,
): Promise<boolean> => {
	const user = await UserModel.findById(userId);

	if (isNull(user)) {
		return false;
	}

	for (const role of user.roles) {
		const permissionsForRole = ROLE_TO_PERMISSIONS_MAP[role];
		const hasRequiredPermission = permissionsForRole.some((permission) => {
			return permissions.includes(permission);
		});

		if (hasRequiredPermission) {
			return true;
		}
	}

	return false;
};

const checkPermissions = (
	permissions: Array<PermissionId>,
): onRequestAsyncHookHandler => {
	return async function checkPermissionsHandler(request, response) {
		const userIdFromJwtCookie = getUserIdFromJwtCookie(
			this,
			request,
		);

		const hasPermissionsForRequest = await hasPermissions(
			userIdFromJwtCookie,
			permissions,
		);

		if (!hasPermissionsForRequest) {
			const status = ResponseStatus.FORBIDDEN;

			return await response
				.status(status)
				.send({
					status,
				});
		}
	};
};

export {
	checkPermissions,
	hasPermissions,
	PermissionId,
	RoleId,
};
