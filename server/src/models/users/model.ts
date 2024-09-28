import mongoose from "mongoose";

import {
	ROLES,
} from "@/models/permissions/constants";
import {
	transformJsonPlugin,
} from "@/plugins/mongoose";
import {
	isEmpty,
} from "@/utilities/is-empty";

import {
	type User,
	type UserFull,
} from "./types";

const {
	Schema,
} = mongoose;

const UserSchema = new Schema<UserFull>(
	{
		displayedName: {
			required: [
				true,
				"Displayed name is required.",
			],
			trim: true,
			type: Schema.Types.String,
		},
		email: {
			lowercase: true,
			minlength: [
				3,
				"Email should have be at least 3 characters.",
			],
			required: [
				true,
				"Email is required.",
			],
			trim: true,
			type: Schema.Types.String,
			unique: true,
		},
		password: {
			minlength: [
				3,
				"Password should have be at least 3 characters.",
			],
			required: [
				true,
				"Password is required.",
			],
			// We allow to password to be present in query results, because it will be purged in `toJSON` method (see below).
			select: true,
			type: Schema.Types.String,
		},
		roles: {
			// Otherwise an empty object is set and `required` validation is not triggered.
			default: undefined,
			enum: {
				message: "Unsupported role.",
				values: ROLES,
			},
			required: [
				true,
				"Roles list is required.",
			],
			type: [
				Schema.Types.String,
			],
			validate: [
				{
					message: "User should have at least one role.",
					validator: (value) => {
						return (
							Array.isArray(value)
							&& !isEmpty(value)
						);
					},
				},
			],
		},
	},
	{
		toJSON: {
			transform(document, record) {
				const {
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					password,
					...restFields
				} = record;

				return restFields as User;
			},
		},
	},
);

UserSchema.plugin(transformJsonPlugin);

UserSchema.pre(
	"save",
	// In this case, function declaration is required to correctly work with `this`.
	// eslint-disable-next-line prefer-arrow-callback
	async function preSave(next) {
		try {
			if (
				this.isModified("password")
				|| this.isNew
			) {
				const hashedPassword = await Bun.password.hash(this.password);

				this.password = hashedPassword;
			}
		} catch (error) {
			const typedError = error as Error;

			next(typedError);
		}
	},
);

const UserModel = mongoose.model(
	"user",
	UserSchema,
	"users",
);

export {
	UserModel,
};
