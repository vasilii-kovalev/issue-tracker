import {
	type Role as GeneratedRole,
} from "@prisma/client";

import {
	type PaginatedPage,
	type PaginatedPageQueryParams,
	type WithSortingString,
} from "@/models/pagination/types";
import {
	type PermissionId,
} from "@/models/permissions/types";
import {
	type UserId,
} from "@/models/users/types";

import {
	type RoleId,
} from "./constants";

interface RoleFull extends GeneratedRole {
	id: RoleId;
	permissions: Array<PermissionId>;
	users: Array<UserId>;
}

interface RoleFilter {
	id: string;
}

interface RolesPaginatedPageQueryParams extends
	PaginatedPageQueryParams,
	Partial<RoleFilter>,
	Partial<WithSortingString> {}

type RolesPaginatedPage = PaginatedPage<RoleFull>;

export type {
	RoleFilter,
	RoleFull,
	RolesPaginatedPage,
	RolesPaginatedPageQueryParams,
};
