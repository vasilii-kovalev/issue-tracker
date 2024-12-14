import {
	type Role,
} from "@/models/permissions/constants";
import {
	type PaginatedPage,
} from "@/types/pagination";

type DateString = string;

interface UserFull {
	createdDate: DateString;
	displayedName: string;
	email: string;
	id: string;
	password: string;
	roles: Array<Role>;
	updatedDate: DateString;
}

type User = Pick<
	UserFull,
	| "createdDate"
	| "displayedName"
	| "email"
	| "id"
	| "roles"
	| "updatedDate"
>;

type PaginatedUsers = PaginatedPage<User>;

export type {
	PaginatedUsers,
	User,
};
