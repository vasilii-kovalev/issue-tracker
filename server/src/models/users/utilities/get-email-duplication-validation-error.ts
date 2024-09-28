import {
	type ValidationError,
} from "@/models/errors/types";

const getEmailDuplicationValidationError = (
	errorMessage: string,
	email: string,
): ValidationError | undefined => {
	const isEmailDuplicationError = errorMessage.includes(
		"E11000 duplicate key error collection: issue-tracker.users index: email_1 dup key",
	);

	if (isEmailDuplicationError) {
		return {
			message: `User with email "${email}" already exists.`,
			path: "email",
		};
	}

	return undefined;
};

export {
	getEmailDuplicationValidationError,
};
