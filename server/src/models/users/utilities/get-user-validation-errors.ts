import {
	type MongooseValidationError,
	type ValidationError,
} from "@/models/errors/types";

const getUserValidationErrors = (
	mongooseValidationError: MongooseValidationError,
): Array<ValidationError> => {
	const errorsList = Object.values(mongooseValidationError.errors);

	return errorsList.reduce<Array<ValidationError>>(
		(validationErrors, validationError) => {
			const {
				path,
				message,
				kind,
				// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
				value,
			} = validationError;

			return validationErrors.concat({
				message: (
					path.startsWith("roles")
					&& kind === "enum"
				)
					? `Unsupported role: "${value}".`
					: message,
				path: `body.${path}`,
			});
		},
		[],
	);
};

export {
	getUserValidationErrors,
};
