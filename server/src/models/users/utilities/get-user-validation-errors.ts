import {
	type MongooseValidationError,
	type ValidationError,
} from "@/types/errors";
import {
	isUndefined,
} from "@/utilities/is-undefined";

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

			const validationErrorWithPath = validationErrors.find((validationErrorCurrent) => {
				return validationErrorCurrent.path === path;
			});

			if (!isUndefined(validationErrorWithPath)) {
				return validationErrors;
			}

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
