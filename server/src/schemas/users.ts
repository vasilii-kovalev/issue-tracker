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
	$id: "UserSchema",
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
	$id: "UserCreateSchema",
	required: [
		"displayedName",
		"email",
		"password",
		"roles",
	],
};

const UserUpdateSchema = {
	...UserSchemaCommonWithPassword,
	$id: "UserUpdateSchema",
};

const UserLoginSchema = {
	...UserSchemaCommonWithPassword,
	$id: "UserLoginSchema",
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
