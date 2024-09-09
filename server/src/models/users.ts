import mongoose from "mongoose";

import {
	transformJsonPlugin,
} from "utilities/schema";

const { Schema } = mongoose;

const userSchema = new Schema({
	fullName: {
		type: Schema.Types.String,
	},
});

userSchema.plugin(transformJsonPlugin);

const UserModel = mongoose.model(
	"user",
	userSchema,
	"users",
);

export {
	UserModel,
}
