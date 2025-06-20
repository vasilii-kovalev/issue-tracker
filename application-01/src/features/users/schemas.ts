import {
	array,
	email,
	flavor,
	maxLength,
	minLength,
	nonEmpty,
	object,
	pick,
	pipe,
	string,
} from "valibot";

import {
	DateStringSchema,
} from "@/features/dates-and-time/schemas";

import {
	getPaginatedPageSchema,
} from "../pagination/schemas";
import {
	RoleIdSchema,
} from "../roles/schemas";

const UserFullSchema = object({
	createdDate: DateStringSchema,
	email: pipe(
		string(),
		nonEmpty(),
		email(),
		flavor("user-email"),
	),
	id: pipe(
		string(),
		nonEmpty(),
		flavor("user-id"),
	),
	name: pipe(
		string(),
		nonEmpty(),
		minLength(1),
		maxLength(100),
	),
	password: pipe(
		string(),
		nonEmpty(),
		minLength(3),
		maxLength(50),
	),
	roles: pipe(
		array(RoleIdSchema),
		nonEmpty(),
	),
	updatedDate: DateStringSchema,
});

const UserIdSchema = UserFullSchema.entries.id;

const UserSchema = pick(
	UserFullSchema,
	[
		"createdDate",
		"email",
		"id",
		"name",
		"roles",
		"updatedDate",
	],
);

const UserLoginSchema = pick(
	UserFullSchema,
	[
		"email",
		"password",
	],
);

const UserLoginResponseSchema = pick(
	UserFullSchema,
	[
		"id",
	],
);

const UsersPaginatedPageSchema = getPaginatedPageSchema(UserSchema);

export {
	UserIdSchema,
	UserLoginResponseSchema,
	UserLoginSchema,
	UserSchema,
	UsersPaginatedPageSchema,
};
