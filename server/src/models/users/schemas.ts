import {
	SchemaId,
} from "@/constants/schemas";
import {
	PaginatedPageParamsSchema,
	PaginatedPageSchema,
	WithSortingStringSchema,
} from "@/models/pagination/schemas";
import {
	pickByKeys,
} from "@/utilities/pick-by-keys";

import {
	type User,
	type UserCreate,
	type UserFilter,
	type UserFull,
	type UserLogin,
	type UserLoginResponse,
	type UsersPaginatedPage,
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
			 * {@link https://www.npmjs.com/package/ajv-formats#formats Formats list}
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
			maxLength: 50,
			minLength: 3,
			type: "string",
		},
		roles: {
			items: {
				$ref: SchemaId.ROLE_ID,
			},
			type: "array",
			uniqueItems: true,
		},
		updatedDate: {
			format: "date-time",
			type: "string",
		},
	} satisfies Record<keyof UserFull, unknown>,
	required: [
		"createdDate",
		"email",
		"id",
		"name",
		"password",
		"roles",
		"updatedDate",
	] satisfies Array<keyof UserFull>,
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

const UserLoginResponseSchema = {
	properties: pickByKeys(
		UserFullSchema.properties,
		[
			"id",
		],
	) satisfies Record<keyof UserLoginResponse, unknown>,
	required: [
		"id",
	] satisfies Array<keyof UserLoginResponse>,
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
		sorting: {
			...WithSortingStringSchema.properties.sorting,
			description: (
				`${WithSortingStringSchema.properties.sorting.description}
				Supported fields: \`createdDate\`, \`email\`, \`name\`, \`updatedDate\`.`
			),
		},
	} satisfies Record<keyof UsersPaginatedPageQueryParams, unknown>,
	required: [
		...PaginatedPageParamsSchema.required,
	] satisfies Array<keyof UsersPaginatedPageQueryParams>,
	type: "object",
};

const UsersPaginatedPageSchema = {
	$ref: SchemaId.PAGINATED_PAGE,
	properties: {
		...PaginatedPageSchema.properties,
		data: {
			...PaginatedPageSchema.properties.data,
			items: {
				$ref: SchemaId.USER,
			},
		},
	} satisfies Record<keyof UsersPaginatedPage, unknown>,
};

export {
	UserCreateSchema,
	UserFullSchema,
	UserLoginResponseSchema,
	UserLoginSchema,
	UserSchema,
	UsersPaginatedPageQueryParamsSchema,
	UsersPaginatedPageSchema,
	UserUpdateSchema,
};
