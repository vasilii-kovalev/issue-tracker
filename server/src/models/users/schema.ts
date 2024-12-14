import {
	SchemaId,
} from "@/constants/schemas";
import {
	PaginatedPage,
	WithPaginatedPageParamsSchema,
	WithSortingStringSchema,
} from "@/models/pagination/schema";
import {
	Role,
} from "@/models/permissions/constants";
import {
	pickByKeys,
} from "@/utilities/pick-by-keys";

const UserFullSchema = {
	properties: {
		createdDate: {
			format: "date-time",
			type: "string",
		},
		displayedName: {
			maxLength: 100,
			minLength: 1,
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
	},
	type: "object",
};

const UserSchema = {
	$id: SchemaId.USER,
	properties: pickByKeys(
		UserFullSchema.properties,
		[
			"createdDate",
			"displayedName",
			"email",
			"id",
			"roles",
			"updatedDate",
		],
	),
	required: [
		"createdDate",
		"displayedName",
		"email",
		"id",
		"roles",
		"updatedDate",
	],
	type: "object",
};

const UserCreateSchema = {
	$id: SchemaId.USER_CREATE,
	properties: pickByKeys(
		UserFullSchema.properties,
		[
			"displayedName",
			"email",
			"password",
			"roles",
		],
	),
	required: [
		"displayedName",
		"email",
		"password",
		"roles",
	],
	type: "object",
};

const UserUpdateSchema = {
	$id: SchemaId.USER_UPDATE,
	properties: pickByKeys(
		UserFullSchema.properties,
		[
			"displayedName",
			"email",
			"password",
			"roles",
		],
	),
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
	),
	required: [
		"email",
		"password",
	],
	type: "object",
};

const UserFilterSchema = {
	properties: {
		displayedName: {
			maxLength: 100,
			minLength: 1,
			type: "string",
		},
	},
	type: "object",
};

const UsersPaginatedPageQueryParamsSchema = {
	properties: {
		...WithPaginatedPageParamsSchema.properties,
		...UserFilterSchema.properties,
		...WithSortingStringSchema.properties,
	},
	required: [
		...WithPaginatedPageParamsSchema.required,
	],
	type: "object",
};

const UsersPaginatedPageSchema = {
	...PaginatedPage,
	$id: SchemaId.USERS_PAGINATED_PAGE,
	properties: {
		...PaginatedPage.properties,
		data: {
			...PaginatedPage.properties.data,
			items: {
				$ref: SchemaId.USER,
			},
		},
	},
};

export {
	UserCreateSchema,
	UserLoginSchema,
	UserSchema,
	UsersPaginatedPageQueryParamsSchema,
	UsersPaginatedPageSchema,
	UserUpdateSchema,
};
