import {
	type Role,
} from "@/models/permissions/constants";

import {
	type User,
} from "../types";

// TODO: find a better way to describe `roles` type using Prisma types and `USER_SELECTOR`.
interface UserInput extends Omit<User, "roles"> {
	roles: Array<{
		id: string;
	}>;
}

const formatUser = (
	user: UserInput,
): User => {
	return {
		...user,
		roles: user.roles.map<Role>((role) => {
			return role.id as Role;
		}),
	};
};

export {
	formatUser,
};
