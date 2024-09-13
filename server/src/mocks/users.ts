import {
	RoleId,
} from "@/models/permissions/constants";
import {
	type UserCreate,
} from "@/models/users/types";

const userMocks: Array<UserCreate> = [
	{
		displayedName: "Admin",
		email: "admin@issue-tracker.com",
		password: "admin-password",
		roles: [
			RoleId.ADMIN,
		],
	},
	{
		displayedName: "User",
		email: "user@issue-tracker.com",
		password: "user-password",
		roles: [
			RoleId.USER,
		],
	},
];

export {
	userMocks,
};
