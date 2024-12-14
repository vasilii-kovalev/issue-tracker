import {
	type User as GeneratedUser,
} from "@prisma/client";

import {
	type PaginatedPage,
} from "@/models/pagination/types";
import {
	type Role,
} from "@/models/permissions/constants";

interface UserFull extends GeneratedUser {
	roles: Array<Role>;
}

type UserId = UserFull["id"];

type User = Pick<
	UserFull,
	| "createdDate"
	| "displayedName"
	| "email"
	| "id"
	| "roles"
	| "updatedDate"
>;

type UserCreate = Pick<
	UserFull,
	| "displayedName"
	| "email"
	| "password"
	| "roles"
>;

type UserUpdate = Partial<
	Pick<
		UserFull,
		| "displayedName"
		| "email"
		| "password"
		| "roles"
	>
>;

type UserLogin = Pick<
	UserFull,
	| "email"
	| "password"
>;

type UsersPaginatedPage = PaginatedPage<User>;

export type {
	User,
	UserCreate,
	UserFull,
	UserId,
	UserLogin,
	UsersPaginatedPage,
	UserUpdate,
};
