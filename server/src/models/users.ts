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

const userSchema = new Schema<User>(
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

userSchema.plugin(transformJsonPlugin);

const UserModel = mongoose.model(
	"user",
	userSchema,
	"users",
);

export {
	type User,
	type UserId,
	UserModel,
};
