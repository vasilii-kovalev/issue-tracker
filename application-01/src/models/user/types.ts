import {
	type DateString,
} from "@/models/dates-and-time/types";
import {
	type PaginatedPage,
} from "@/models/pagination/types";
import {
	type RoleId,
} from "@/models/roles/constants";

interface UserFull {
	createdDate: DateString;
	email: string;
	id: string;
	name: string;
	roles: Array<RoleId>;
	password: string;
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

type UserLogin = Pick<
	UserFull,
	| "email"
	| "password"
>;

type UserLoginResponse = Pick<
	UserFull,
	| "id"
>;

type UsersPaginatedPage = PaginatedPage<User>;

export type {
	User,
	UserLogin,
	UserLoginResponse,
	UsersPaginatedPage,
};
