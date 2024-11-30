import {
	type Role,
} from "@/models/permissions/constants";
import {
	type PaginatedPage,
} from "@/types/pagination";

interface UserFull {
	displayedName: string;
	email: string;
	id: string;
	password: string;
	role: Role;
}

type User = Pick<
	UserFull,
	| "displayedName"
	| "email"
	| "id"
	| "role"
>;

type PaginatedUsers = PaginatedPage<User>;

export type {
	PaginatedUsers,
	User,
};
