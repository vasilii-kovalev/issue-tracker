import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
	name: {
		type: String,
	},
});

const UserModel = mongoose.model(
	"user",
	userSchema,
	"users",
);

export {
	UserModel,
}
