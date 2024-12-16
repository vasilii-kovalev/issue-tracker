import {
	type onRequestAsyncHookHandler,
} from "fastify";

import {
	ResponseStatus,
} from "@/constants/api";

const checkJwt: onRequestAsyncHookHandler = async (
	request,
	response,
) => {
	try {
		await request.jwtVerify();
	} catch {
		return await response
			.status(ResponseStatus.UNAUTHORIZED)
			.send();
	}
};

export {
	checkJwt,
};
