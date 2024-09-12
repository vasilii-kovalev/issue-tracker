import {
	type FastifyInstance,
	type FastifyRequest,
	type onRequestAsyncHookHandler,
} from "fastify";

import {
	ResponseStatus,
} from "@/constants";
import {
	isNull,
} from "@/utilities/is-null";
import {
	isUndefined,
} from "@/utilities/is-undefined";

import {
	ErrorCode,
} from "./errors";
import {
	type User,
	type UserId,
} from "./users";

const COOKIE_JWT_TOKEN_NAME = "token";

interface JwtPayload {
	payload: User;
}

const getUserIdFromJwtCookie = (
	server: FastifyInstance,
	request: FastifyRequest,
): UserId | undefined => {
	const cookieHeader = request.headers.cookie;

	if (isUndefined(cookieHeader)) {
		return undefined;
	}

	const parsedCookie = server.parseCookie(cookieHeader);
	const token = parsedCookie[COOKIE_JWT_TOKEN_NAME];
	const decodedToken = server.jwt.decode<JwtPayload>(token);

	if (isNull(decodedToken)) {
		return undefined;
	}

	return decodedToken.payload.id;
};

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
	COOKIE_JWT_TOKEN_NAME,
	getUserIdFromJwtCookie,
};
