import {
	SchemaId,
} from "@/constants/schemas";
import {
	PaginatedPage,
} from "@/models/pagination/schema";
import {
	ROLES,
} from "@/models/permissions/constants";

const UserSchemaCommon = {
	properties: {
		displayedName: {
			type: "string",
		},
		email: {
			type: "string",
		},
		roles: {
			items: {
				enum: ROLES,
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
			type: "string",
		},
	},
};

const UserSchema = {
	...UserSchemaCommon,
	$id: SchemaId.USER,
	properties: {
		...UserSchemaCommon.properties,
		id: {
			type: "string",
		},
	},
	required: [
		"displayedName",
		"email",
		"id",
		"roles",
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
