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
	ValidationErrorCode,
} from "../i18n/constants";
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
		nonEmpty(ValidationErrorCode.USER_VALIDATION_EMAIL_EMPTY),
		email(ValidationErrorCode.USER_VALIDATION_EMAIL_INVALID),
		flavor("user-email"),
	),
	id: pipe(
		string(),
		flavor("user-id"),
	),
	name: pipe(
		string(),
		nonEmpty(ValidationErrorCode.USER_VALIDATION_NAME_EMPTY),
		minLength(
			1,
			ValidationErrorCode.USER_VALIDATION_NAME_LENGTH_MIN,
		),
		maxLength(
			100,
			ValidationErrorCode.USER_VALIDATION_NAME_LENGTH_MAX,
		),
	),
	password: pipe(
		string(),
		nonEmpty(ValidationErrorCode.USER_VALIDATION_PASSWORD_EMPTY),
		minLength(
			3,
			ValidationErrorCode.USER_VALIDATION_PASSWORD_LENGTH_MIN,
		),
		maxLength(
			50,
			ValidationErrorCode.USER_VALIDATION_PASSWORD_LENGTH_MAX,
		),
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
