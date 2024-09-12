import {
	UserModel,
} from "@/models/users/model";
import {
	type UserId,
} from "@/models/users/types";
import {
	isNull,
} from "@/utilities/is-null";

import {
	type PermissionId,
	ROLE_TO_PERMISSIONS_MAP,
} from "../constants";

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

export {
	hasPermissions,
};
