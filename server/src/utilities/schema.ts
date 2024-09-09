import type mongoose from "mongoose";

// There is no way to get the schema's plugin type, so we use the global one.
type PluginFunction = Parameters<typeof mongoose.plugin>[0];

const transformJsonPlugin: PluginFunction = (schema) => {
	schema.set(
		"toJSON",
		{
			transform: (document, record) => {
				// eslint-disable-next-line no-underscore-dangle
				const {
					// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-unused-vars
					_id,
					...recordWithoutId
				} = record;

				return recordWithoutId;
			},
			// To get `id` field.
			virtuals: true,
		},
	);
};

export {
	transformJsonPlugin,
};
