import {
	SchemaId,
} from "@/constants/schemas";
import {
	PaginatedPage,
} from "@/models/pagination/schema";
import {
	Role,
} from "@/models/permissions/constants";

const UserSchemaCommon = {
	properties: {
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
		roles: {
			items: {
				enum: Object.values(Role),
				type: "string",
			},
			type: "array",
		},
	},
	type: "object",
};

const UserSchemaCommonWithPassword = {
	...UserSchemaCommon,
	properties: {
		...UserSchemaCommon.properties,
		password: {
			format: "password",
			minLength: 3,
			type: "string",
		},
	},
};

const UserSchema = {
	...UserSchemaCommon,
	$id: SchemaId.USER,
	properties: {
		...UserSchemaCommon.properties,
		createdDate: {
			format: "date-time",
			type: "string",
		},
		id: {
			type: "string",
		},
		updatedDate: {
			format: "date-time",
			type: "string",
		},
	},
	required: [
		"createdDate",
		"displayedName",
		"email",
		"id",
		"roles",
		"updatedDate",
	],
};

const UserCreateSchema = {
	...UserSchemaCommonWithPassword,
	$id: SchemaId.USER_CREATE,
	required: [
		"displayedName",
		"email",
		"password",
		"roles",
	],
};

const UserUpdateSchema = {
	...UserSchemaCommonWithPassword,
	$id: SchemaId.USER_UPDATE,
};

const UserLoginSchema = {
	...UserSchemaCommonWithPassword,
	$id: SchemaId.USER_LOGIN,
	properties: {
		email: UserSchemaCommonWithPassword.properties.email,
		password: UserSchemaCommonWithPassword.properties.password,
	},
	required: [
		"email",
		"password",
	],
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
	UsersPaginatedPageSchema,
	UserUpdateSchema,
};
