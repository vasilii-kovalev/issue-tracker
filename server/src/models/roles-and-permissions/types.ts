import {
	type Permission as PermissionFull,
} from "@prisma/client";

import {
	type Action,
	type Resource,
	type Scope,
} from "./constants";

/** Format: `resource:action:scope`. */
type PermissionId = PermissionFull["id"];

interface Permission {
	action: Action;
	resource: Resource;
	scope: Scope;
}

export type {
	Permission,
	PermissionId,
};
