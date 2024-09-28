import {
	type RoleId,
} from "@/models/permissions/constants";
import {
	type PaginatedPage,
} from "@/types/pagination";

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

type PaginatedUsers = PaginatedPage<User>;

export type {
	PaginatedUsers,
	User,
};
