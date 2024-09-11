import mongoose from "mongoose";

import {
	transformJsonPlugin,
} from "@/utilities/schema";

const {
	Schema,
} = mongoose;

type UserId = string;

interface User {
	displayedName: string;
	email: string;
	password: string;
	userName: string;
}

const UserSchema = new Schema<User>(
	{
		displayedName: {
			required: true,
			trim: true,
			type: Schema.Types.String,
		},
		email: {
			lowercase: true,
			required: true,
			trim: true,
			type: Schema.Types.String,
			unique: true,
		},
		password: {
			required: true,
			select: false,
			type: Schema.Types.String,
		},
		userName: {
			lowercase: true,
			required: true,
			trim: true,
			type: Schema.Types.String,
			unique: true,
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

				return restFields;
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
			next(error as Error);
		}
	},
);

UserSchema.methods.comparePassword = async function comparePassword(password: string): Promise<boolean> {
	return await Bun.password.verify(
		password,
		this.password as string,
	);
};

const UserModel = mongoose.model(
	"user",
	UserSchema,
	"users",
);

export {
	type User,
	type UserId,
	UserModel,
};
