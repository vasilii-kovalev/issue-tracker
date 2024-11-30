import {
	type User as UserFull,
} from "@prisma/client";

import {
	type PaginatedPage,
} from "@/models/pagination/types";

type UserId = UserFull["id"];

type User = Pick<
	UserFull,
	| "displayedName"
	| "email"
	| "id"
	| "role"
>;

type UserCreate = Pick<
	UserFull,
	| "displayedName"
	| "email"
	| "password"
	| "role"
>;

type UserUpdate = Partial<
	Pick<
		UserFull,
		| "displayedName"
		| "email"
		| "password"
		| "role"
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
