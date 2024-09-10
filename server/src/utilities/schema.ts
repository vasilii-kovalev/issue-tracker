import type mongoose from "mongoose";

// There is no way to get the schema's plugin type, so we use the global one.
type PluginFunction = Parameters<typeof mongoose.plugin>[0];

const transformJsonPlugin: PluginFunction = (schema) => {
	schema.set(
		"timestamps",
		true,
	);

	// @ts-expect-error `options` field actually exists.
	const customTransform = (schema.options as mongoose.SchemaOptions).toJSON?.transform;

	schema.set(
		"toJSON",
		{
			// eslint-disable-next-line @typescript-eslint/promise-function-async
			transform: (document, record, ...otherParams) => {
				// eslint-disable-next-line no-underscore-dangle
				const {
					/* eslint-disable @typescript-eslint/naming-convention, @typescript-eslint/no-unused-vars */
					__v,
					_id,
					createdAt,
					updatedAt,
					/* eslint-enable */
					...restFields
				} = record;

				if (
					customTransform !== undefined
					&& customTransform !== true
					&& customTransform !== false
				) {
					// eslint-disable-next-line @typescript-eslint/no-unsafe-return
					return customTransform(
						document,
						restFields,
						...otherParams,
					);
				}

				return restFields;
			},
			// To get `id` field.
			virtuals: true,
		},
	);
};

export {
	transformJsonPlugin,
};
