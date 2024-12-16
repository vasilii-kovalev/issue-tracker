import {
	type FastifyInstance,
	type FastifyRequest,
} from "fastify";

import {
	type UserId,
} from "@/models/users/types";
import {
	isNull,
} from "@/utilities/is-null";
import {
	isUndefined,
} from "@/utilities/is-undefined";

import {
	COOKIE_JWT_TOKEN_NAME,
} from "../constants";
import {
	type JwtPayload,
} from "../types";

interface GetUserIdFromJwtCookieParams {
	request: FastifyRequest;
	server: FastifyInstance;
}

const getUserIdFromJwtCookie = ({
	request,
	server,
}: GetUserIdFromJwtCookieParams): UserId | undefined => {
	const {
		cookie,
	} = request.headers;

	if (isUndefined(cookie)) {
		return undefined;
	}

	const parsedCookie = server.parseCookie(cookie);
	const token = parsedCookie[COOKIE_JWT_TOKEN_NAME];
	const decodedToken = server.jwt.decode<JwtPayload>(token);

	if (isNull(decodedToken)) {
		return undefined;
	}

	return decodedToken.payload;
};

export {
	getUserIdFromJwtCookie,
};
