import {
	type RoleId,
} from "@/models/roles/constants";
import {
	type WithId,
} from "@/types";

import {
	type User,
} from "../types";

// TODO: find a better way to describe the value using Prisma types and the model's selectors.
interface SelectedUser extends Omit<User, "roles"> {
	roles: Array<WithId>;
}

const formatSelectedUser = (
	selectedUser: SelectedUser,
): User => {
	return {
		...selectedUser,
		roles: selectedUser.roles.map<RoleId>((role) => {
			return role.id as RoleId;
		}),
	};
};

export {
	formatSelectedUser,
};
