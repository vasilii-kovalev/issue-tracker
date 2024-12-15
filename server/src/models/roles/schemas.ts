import {
	SchemaId,
} from "@/constants/schemas";
import {
	PaginatedPageParamsSchema,
	PaginatedPageSchema,
	WithSortingStringSchema,
} from "@/models/pagination/schema";

import {
	RoleId,
} from "./constants";
import {
	type RoleFilter,
	type RoleFull,
	type RolesPaginatedPage,
	type RolesPaginatedPageQueryParams,
} from "./types";

const RoleIdSchema = {
	$id: SchemaId.ROLE_ID,
	enum: Object.values(RoleId),
	type: "string",
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
			items: {
				$ref: SchemaId.PERMISSION_ID,
			},
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

const RoleFilterSchema = {
	properties: {
		id: {
			maxLength: 100,
			minLength: 1,
			type: "string",
		},
	} satisfies Record<keyof RoleFilter, unknown>,
	type: "object",
};

const RolesPaginatedPageQueryParamsSchema = {
	properties: {
		...PaginatedPageParamsSchema.properties,
		...RoleFilterSchema.properties,
		...WithSortingStringSchema.properties,
	} satisfies Record<keyof RolesPaginatedPageQueryParams, unknown>,
	required: [
		...PaginatedPageParamsSchema.required,
	] satisfies Array<keyof RolesPaginatedPageQueryParams>,
	type: "object",
};

const RolesPaginatedPageSchema = {
	$ref: SchemaId.PAGINATED_PAGE,
	properties: {
		...PaginatedPageSchema.properties,
		data: {
			...PaginatedPageSchema.properties.data,
			items: {
				$ref: SchemaId.ROLE_FULL,
			},
		},
	} satisfies Record<keyof RolesPaginatedPage, unknown>,
};

export {
	RoleFullSchema,
	RolesPaginatedPageQueryParamsSchema,
	RolesPaginatedPageSchema,
};
