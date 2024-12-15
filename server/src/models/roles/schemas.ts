import {
	SchemaId,
} from "@/constants/schemas";
import {
	pickByKeys,
} from "@/utilities/pick-by-keys";

import {
	RoleId,
} from "./constants";
import {
	type Role,
	type RoleFilter,
	type RoleFull,
} from "./types";

const RoleIdSchema = {
	$id: SchemaId.ROLE_ID,
	enum: Object.values(RoleId),
	type: "string",
};

const RoleFullSchema = {
	$id: SchemaId.ROLE,
	properties: {
		createdDate: {
			format: "date-time",
			type: "string",
		},
		description: {
			maxLength: 100,
			minLength: 1,
			type: "string",
		},
		id: RoleIdSchema,
		updatedDate: {
			format: "date-time",
			type: "string",
		},
	} satisfies Record<keyof RoleFull, unknown>,
	required: [
		"createdDate",
		"description",
		"id",
		"updatedDate",
	] satisfies Array<keyof RoleFull>,
	type: "object",
};

const RoleSchema = {
	$id: SchemaId.ROLE,
	properties: pickByKeys(
		RoleFullSchema.properties,
		[
			"description",
			"id",
		],
	) satisfies Record<keyof Role, unknown>,
	required: [
		"description",
		"id",
	] satisfies Array<keyof Role>,
	type: "object",
};

const RoleFilterSchema = {
	properties: {
		description: {
			maxLength: 100,
			minLength: 1,
			type: "string",
		},
	} satisfies Record<keyof RoleFilter, unknown>,
	type: "object",
};

export {
	RoleFilterSchema,
	RoleSchema,
};
