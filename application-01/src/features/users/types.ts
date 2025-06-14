import {
	type DateString,
} from "@/features/dates-and-time/types";
import {
	type PaginatedPage,
} from "@/features/pagination/types";
import {
	type RoleId,
} from "@/features/roles/constants";

interface UserFull {
	createdDate: DateString;
	email: string;
	id: string;
	name: string;
	roles: Array<RoleId>;
	password: string;
	updatedDate: DateString;
}

type UserId = UserFull["id"];

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
	UserId,
	UserLogin,
	UserLoginResponse,
	UsersPaginatedPage,
};
