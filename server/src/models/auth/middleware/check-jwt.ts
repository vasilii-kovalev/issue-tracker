import {
	type onRequestAsyncHookHandler,
} from "fastify";

import {
	ResponseStatus,
} from "@/constants";
import {
	ErrorCode,
} from "@/models/errors/constants";

const checkJwt: onRequestAsyncHookHandler = async (request, response) => {
	try {
		await request.jwtVerify();
	} catch (error) {
		const typedError = error as Error;
		const status = ResponseStatus.UNAUTHORIZED;

		return await response
			.status(status)
			.send({
				code: ErrorCode.UNAUTHORIZED,
				message: typedError.message,
				status,
			});
	}
};

export {
	checkJwt,
};
