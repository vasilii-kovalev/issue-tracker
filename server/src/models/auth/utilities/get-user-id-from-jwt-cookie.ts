import {
	type FastifyInstance,
	type FastifyRequest,
} from "fastify";

import {
	type User,
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

export {
	getUserIdFromJwtCookie,
};
