import {
	type onRequestAsyncHookHandler,
} from "fastify";

import {
	ResponseStatus,
} from "@/constants";
import {
	type ErrorResponse,
} from "@/types/errors";

const checkJwt: onRequestAsyncHookHandler = async (request, response) => {
	try {
		await request.jwtVerify();
	} catch (error) {
		const typedError = error as Error;

		return await response
			.status(ResponseStatus.UNAUTHORIZED)
			.send({
				message: typedError.message,
			} satisfies ErrorResponse);
	}
};

export {
	checkJwt,
};
