const verifyUserPassword = async (
	password: string,
	hashedPassword: string,
): Promise<boolean> => {
	return await Bun.password.verify(
		password,
		hashedPassword,
	);
};

export {
	verifyUserPassword,
};
