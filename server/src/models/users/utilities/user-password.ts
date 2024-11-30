import {
	type UserFull,
} from "../types";

const hashUserPassword = async (
	password: string,
): Promise<string> => {
	return await Bun.password.hash(password);
};

const verifyUserPassword = async (
	password: string,
	hashedPassword: UserFull["password"],
): Promise<boolean> => {
	return await Bun.password.verify(
		password,
		hashedPassword,
	);
};

export {
	hashUserPassword,
	verifyUserPassword,
};
