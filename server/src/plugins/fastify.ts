import ajvErrorsOriginal from "ajv-errors";

/*
	Either Fastify doesn't pass `ajv.opts` as `options`,
	or `ajv-errors` doesn't check `ajv.opts`, while it should,
	so we need to merge `ajv.opts` with `options` and pass the result as a second
	argument to the plugin.
*/
const ajvErrors: typeof ajvErrorsOriginal = (ajv, options) => {
	return ajvErrorsOriginal(
		ajv,
		{
			...ajv.opts,
			...options,
		},
	);
};

export {
	ajvErrors,
};
