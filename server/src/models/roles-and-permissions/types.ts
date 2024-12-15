import {
	type Permission as GeneratedPermission,
	type Role as GeneratedRole,
} from "@prisma/client";

import {
	type PaginatedPage,
	type PaginatedPageQueryParams,
	type WithSortingString,
} from "@/models/pagination/types";
import {
	type UserId,
} from "@/models/users/types";

import {
	type Action,
	type Resource,
	type RoleId,
	type Scope,
} from "./constants";

interface PermissionFull extends GeneratedPermission {
	action: Action;
	resource: Resource;
	roles: Array<RoleId>;
	scope: Scope;
	users: Array<UserId>;
}

/** Format: `resource:action:scope`. */
type PermissionId = PermissionFull["id"];

type Permission = Pick<
	PermissionFull,
	| "action"
	| "resource"
	| "scope"
>;

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
	Permission,
	PermissionFull,
	PermissionId,
	RoleFilter,
	RoleFull,
	RolesPaginatedPage,
	RolesPaginatedPageQueryParams,
};
