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
	} catch (error) {
		/*
			Error occurs in two cases:
			1. Un-signed cookie is invalid. `jwtVerify` un-signs cookie and uses the result to decode the token,
			but if the unsigned cookie is invalid, the value will be `null`, which cases the error while decoding
			2. The JWT token is invalid, because of the point 1 or other reasons
		*/
		console.error(error);

		return await response
			.status(ResponseStatus.UNAUTHORIZED)
			.send();
	}
};

export {
	checkJwt,
};
