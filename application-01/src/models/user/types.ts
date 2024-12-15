import {
	type Role,
} from "@/models/permissions/constants";
import {
	type PaginatedPage,
} from "@/types/pagination";

type DateString = string;

interface UserFull {
	createdDate: DateString;
	email: string;
	id: string;
	name: string;
	password: string;
	roles: Array<Role>;
	updatedDate: DateString;
}

type User = Pick<
	UserFull,
	| "createdDate"
	| "email"
	| "id"
	| "name"
	| "roles"
	| "updatedDate"
>;

type PaginatedUsers = PaginatedPage<User>;

export type {
	PaginatedUsers,
	User,
};
