import {
	type RoleId,
} from "@/models/permissions/constants";

type UserId = string;

interface User {
	displayedName: string;
	email: string;
	id: UserId;
	password: string;
	userName: string;
	roles: Array<RoleId>;
}

export type {
	User,
	UserId,
};
