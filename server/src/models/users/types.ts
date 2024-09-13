import {
	type RoleId,
} from "@/models/permissions/constants";

type UserId = string;

interface User {
	displayedName: string;
	email: string;
	id: UserId;
	password: string;
	roles: Array<RoleId>;
}

type UserCreate = Omit<
	User,
	"id"
>;

export type {
	User,
	UserCreate,
	UserId,
};
