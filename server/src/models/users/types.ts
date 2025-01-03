import {
	type User as GeneratedUser,
} from "@prisma/client";

import {
	type PaginatedPage,
	type PaginatedPageQueryParams,
	type WithSortingString,
} from "@/models/pagination/types";
import {
	type RoleId,
} from "@/models/roles/constants";

interface UserFull extends GeneratedUser {
	roles: Array<RoleId>;
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

type UserCreate = Pick<
	UserFull,
	| "email"
	| "name"
	| "password"
	| "roles"
>;

type UserUpdate = Partial<
	Pick<
		UserFull,
		| "email"
		| "name"
		| "password"
		| "roles"
	>
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

interface UserFilter {
	name: string;
}

interface UsersPaginatedPageQueryParams extends
	PaginatedPageQueryParams,
	Partial<UserFilter>,
	Partial<WithSortingString> {}

type UsersPaginatedPage = PaginatedPage<User>;

export type {
	User,
	UserCreate,
	UserFilter,
	UserFull,
	UserId,
	UserLogin,
	UserLoginResponse,
	UsersPaginatedPage,
	UsersPaginatedPageQueryParams,
	UserUpdate,
};
