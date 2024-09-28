import {
	type onRequestAsyncHookHandler,
} from "fastify";

import {
	ResponseStatus,
} from "@/constants/api";
import {
	type ErrorResponse,
} from "@/models/errors/types";

const checkJwt: onRequestAsyncHookHandler = async (request, response) => {
	try {
		await request.jwtVerify();
	} catch (error) {
		const typedError = error as Error;

		return await response
			.status(ResponseStatus.UNAUTHORIZED)
			.send({
				message: typedError.message,
				validationErrors: [],
			} satisfies ErrorResponse);
	}
};

export {
	checkJwt,
};
