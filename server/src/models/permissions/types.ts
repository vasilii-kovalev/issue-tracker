import {
	type Permission as GeneratedPermission,
} from "@prisma/client";

import {
	type RoleId,
} from "@/models/roles/constants";
import {
	type UserId,
} from "@/models/users/types";

import {
	type Action,
	type Resource,
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

export type {
	Permission,
	PermissionFull,
	PermissionId,
};
