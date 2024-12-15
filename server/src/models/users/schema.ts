import {
	SchemaId,
} from "@/constants/schemas";
import {
	PaginatedPageParamsSchema,
	PaginatedPageSchema,
	WithSortingStringSchema,
} from "@/models/pagination/schema";
import {
	type PaginatedPage,
} from "@/models/pagination/types";
import {
	Role,
} from "@/models/roles-and-permissions/constants";
import {
	pickByKeys,
} from "@/utilities/pick-by-keys";

import {
	type User,
	type UserCreate,
	type UserFilter,
	type UserFull,
	type UserLogin,
	type UsersPaginatedPageQueryParams,
	type UserUpdate,
} from "./types";

const UserFullSchema = {
	properties: {
		createdDate: {
			format: "date-time",
			type: "string",
		},
		email: {
			/**
			 * Provided by `ajv-formats`, which is a part of `fastify` package.\
			 * {@link https://www.npmjs.com/package/ajv-formats#formats | Formats list}
			 */
			format: "email",
			type: "string",
		},
		id: {
			type: "string",
		},
		name: {
			maxLength: 100,
			minLength: 1,
			type: "string",
		},
		password: {
			format: "password",
			minLength: 3,
			type: "string",
		},
		roles: {
			items: {
				enum: Object.values(Role),
				type: "string",
			},
			type: "array",
		},
		updatedDate: {
			format: "date-time",
			type: "string",
		},
	} satisfies Record<keyof UserFull, unknown>,
	type: "object",
};

const UserSchema = {
	$id: SchemaId.USER,
	properties: pickByKeys(
		UserFullSchema.properties,
		[
			"createdDate",
			"email",
			"id",
			"name",
			"roles",
			"updatedDate",
		],
	) satisfies Record<keyof User, unknown>,
	required: [
		"createdDate",
		"email",
		"id",
		"name",
		"roles",
		"updatedDate",
	] satisfies Array<keyof User>,
	type: "object",
};

const UserCreateSchema = {
	$id: SchemaId.USER_CREATE,
	properties: pickByKeys(
		UserFullSchema.properties,
		[
			"email",
			"name",
			"password",
			"roles",
		],
	) satisfies Record<keyof UserCreate, unknown>,
	required: [
		"email",
		"name",
		"password",
		"roles",
	] satisfies Array<keyof UserCreate>,
	type: "object",
};

const UserUpdateSchema = {
	$id: SchemaId.USER_UPDATE,
	properties: pickByKeys(
		UserFullSchema.properties,
		[
			"email",
			"name",
			"password",
			"roles",
		],
	) satisfies Record<keyof UserUpdate, unknown>,
	type: "object",
};

const UserLoginSchema = {
	$id: SchemaId.USER_LOGIN,
	properties: pickByKeys(
		UserFullSchema.properties,
		[
			"email",
			"password",
		],
	) satisfies Record<keyof UserLogin, unknown>,
	required: [
		"email",
		"password",
	] satisfies Array<keyof UserLogin>,
	type: "object",
};

const UserFilterSchema = {
	properties: {
		name: {
			maxLength: 100,
			minLength: 1,
			type: "string",
		},
	} satisfies Record<keyof UserFilter, unknown>,
	type: "object",
};

const UsersPaginatedPageQueryParamsSchema = {
	properties: {
		...PaginatedPageParamsSchema.properties,
		...UserFilterSchema.properties,
		...WithSortingStringSchema.properties,
	} satisfies Record<keyof UsersPaginatedPageQueryParams, unknown>,
	required: [
		...PaginatedPageParamsSchema.required,
	] satisfies Array<keyof UsersPaginatedPageQueryParams>,
	type: "object",
};

const UsersPaginatedPageSchema = {
	...PaginatedPageSchema,
	$id: SchemaId.USERS_PAGINATED_PAGE,
	properties: {
		...PaginatedPageSchema.properties,
		data: {
			...PaginatedPageSchema.properties.data,
			items: {
				$ref: SchemaId.USER,
			},
		},
	} satisfies Record<keyof PaginatedPage<User>, unknown>,
};

export {
	UserCreateSchema,
	UserLoginSchema,
	UserSchema,
	UsersPaginatedPageQueryParamsSchema,
	UsersPaginatedPageSchema,
	UserUpdateSchema,
};
