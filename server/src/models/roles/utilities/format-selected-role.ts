import {
	type RoleId,
} from "../constants";
import {
	type Role,
} from "../types";

// TODO: find a better way to describe the value using Prisma types and the model's selectors.
interface SelectedRole extends Omit<Role, "id"> {
	id: string;
}

const formatSelectedRole = (
	selectedRole: SelectedRole,
): Role => {
	return {
		...selectedRole,
		id: selectedRole.id as RoleId,
	};
};

export {
	formatSelectedRole,
};
