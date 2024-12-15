import {
	SchemaId,
} from "@/constants/schemas";

import {
	Action,
	Resource,
	Scope,
} from "./constants";
import {
	type PermissionFull,
} from "./types";

const PermissionIdSchema = {
	$id: SchemaId.PERMISSION_ID,
	description: "Format: `resource:action:scope`.",
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
			items: {
				$ref: SchemaId.ROLE_ID,
			},
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

export {
	PermissionFillSchema,
};
