import {
	type UserFull,
} from "../types";

const hashUserPassword = async (
	password: string,
): Promise<string> => {
	return await Bun.password.hash(password);
};

interface VerifyUserPasswordParams {
	currentPassword: UserFull["password"];
	passwordToVerify: string;
}

const verifyUserPassword = async ({
	currentPassword,
	passwordToVerify,
}: VerifyUserPasswordParams): Promise<boolean> => {
	return await Bun.password.verify(
		passwordToVerify,
		currentPassword,
	);
};

export {
	hashUserPassword,
	verifyUserPassword,
};
