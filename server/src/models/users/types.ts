import {
	type PaginatedPage,
} from "@/models/pagination/types";
import {
	type RoleId,
} from "@/models/permissions/constants";

type UserId = string;

interface UserFull {
	displayedName: string;
	email: string;
	id: UserId;
	password: string;
	roles: Array<RoleId>;
}

type User = Omit<
	UserFull,
	"password"
>;

type UserCreate = Omit<
	UserFull,
	"id"
>;

type UserUpdate = Partial<
	Omit<
		UserFull,
		"id"
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
