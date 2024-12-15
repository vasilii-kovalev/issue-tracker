import {
	type WithId,
} from "@/types";
import {
	getIds,
} from "@/utilities/get-ids";

import {
	type RoleId,
} from "../constants";
import {
	type RoleFull,
} from "../types";

// TODO: find a better way to describe the value using Prisma types and the model's selectors.
interface Role extends
	Omit<
		RoleFull,
		| "id"
		| "permissions"
		| "users"
	> {
	id: string;
	permissions: Array<WithId>;
	users: Array<WithId>;
}

const getRoleFull = (role: Role): RoleFull => {
	return {
		...role,
		id: role.id as RoleId,
		permissions: getIds(role.permissions),
		users: getIds(role.users),
	};
};

export {
	getRoleFull,
};
