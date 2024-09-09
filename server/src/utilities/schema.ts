import mongoose from "mongoose";

// There is no way to get the schema's plugin type, so we use the global one.
type PluginFunction = Parameters<typeof mongoose.plugin>[0];

const transformJsonPlugin: PluginFunction = (schema) => {
	schema.set(
		"toJSON",
		{
			// To get `id` field.
			virtuals: true,
			transform: (document, record) => {
				const {
					_id,
					...recordWithoutId
				} = record;

				return recordWithoutId;
			},
		},
	);
};

export {
	transformJsonPlugin,
}
