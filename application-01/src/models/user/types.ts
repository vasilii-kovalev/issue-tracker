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
	updatedDate: DateString;
}

type User = Pick<
	UserFull,
	| "createdDate"
	| "email"
	| "id"
	| "name"
	| "updatedDate"
>;

type PaginatedUsers = PaginatedPage<User>;

export type {
	PaginatedUsers,
	User,
};
