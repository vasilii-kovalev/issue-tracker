import {
	type ValidationError,
} from "@/models/errors/types";

const getEmailDuplicationValidationError = (
	errorMessage: string,
	email: string,
): ValidationError | undefined => {
	const isEmailDuplicationError = errorMessage.includes("email_1 dup key");

	if (isEmailDuplicationError) {
		return {
			message: `User with email "${email}" already exists.`,
			path: "body.email",
		};
	}

	return undefined;
};

export {
	getEmailDuplicationValidationError,
};
