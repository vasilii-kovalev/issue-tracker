import {
	type MongooseValidationError,
	type ValidationError,
} from "@/types/errors";

const getUserValidationErrors = (
	mongooseValidationError: MongooseValidationError,
): Array<ValidationError> => {
	const errorsList = Object.values(mongooseValidationError.errors);

	return errorsList.reduce<Array<ValidationError>>(
		(validationErrors, validationError) => {
			const {
				path,
				message,
			} = validationError;

			return validationErrors.concat({
				message,
				path,
			});
		},
		[],
	);
};

export {
	getUserValidationErrors,
};
