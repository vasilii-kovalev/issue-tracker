import {
	SchemaId,
} from "@/constants/schemas";

import {
	Action,
	Resource,
	RoleId,
	Scope,
} from "./constants";
import {
	type PermissionFull,
	type RoleFull,
} from "./types";

const PermissionIdSchema = {
	$id: SchemaId.PERMISSION_ID,
	description: "Format: `resource:action:scope`.",
	type: "string",
};

const RoleIdSchema = {
	$id: SchemaId.ROLE_ID,
	enum: Object.values(RoleId),
	type: "string",
};

const PermissionFillSchema = {
	$id: SchemaId.PERMISSION_FULL,
	properties: {
		action: {
			enum: Object.values(Action),
			type: "string",
		},
		createdDate: {
			format: "date-time",
			type: "string",
		},
		id: PermissionIdSchema,
		resource: {
			enum: Object.values(Resource),
			type: "string",
		},
		roles: {
			items: RoleIdSchema,
			type: "array",
			uniqueItems: true,
		},
		scope: {
			enum: Object.values(Scope),
			type: "string",
		},
		updatedDate: {
			format: "date-time",
			type: "string",
		},
		users: {
			items: {
				$ref: SchemaId.USER_ID,
			},
			type: "array",
			uniqueItems: true,
		},
	} satisfies Record<keyof PermissionFull, unknown>,
	required: [
		"action",
		"createdDate",
		"id",
		"resource",
		"roles",
		"scope",
		"updatedDate",
		"users",
	] satisfies Array<keyof PermissionFull>,
	type: "object",
};

const RoleFullSchema = {
	$id: SchemaId.ROLE_FULL,
	properties: {
		createdDate: {
			format: "date-time",
			type: "string",
		},
		id: RoleIdSchema,
		permissions: {
			items: PermissionIdSchema,
			type: "array",
			uniqueItems: true,
		},
		updatedDate: {
			format: "date-time",
			type: "string",
		},
		users: {
			items: {
				$ref: SchemaId.USER_ID,
			},
			type: "array",
			uniqueItems: true,
		},
	} satisfies Record<keyof RoleFull, unknown>,
	required: [
		"createdDate",
		"id",
		"permissions",
		"updatedDate",
		"users",
	] satisfies Array<keyof RoleFull>,
	type: "object",
};

export {
	PermissionFillSchema,
	RoleFullSchema,
};
