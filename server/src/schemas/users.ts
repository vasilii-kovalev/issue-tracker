import {
	ROLES,
} from "@/models/permissions/constants";

import {
	SchemaId,
} from "./constants";

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

export {
	UserCreateSchema,
	UserLoginSchema,
	UserSchema,
	UserUpdateSchema,
};
