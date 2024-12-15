import {
	type onRequestAsyncHookHandler,
} from "fastify";

import {
	ResponseStatus,
} from "@/constants/api";
import {
	getUserIdFromJwtCookie,
} from "@/models/auth/utilities/get-user-id-from-jwt-cookie";

import {
	type RoleId,
} from "../constants";
import {
	getHasRoles,
} from "../utilities/get-has-roles";

const checkRoles = (
	roles: Array<RoleId>,
): onRequestAsyncHookHandler => {
	return async function checkRolesHandler(request, response) {
		const userIdFromJwtCookie = getUserIdFromJwtCookie(
			this,
			request,
		);

		const hasRolesForRequest = await getHasRoles({
			roles,
			userId: userIdFromJwtCookie,
		});

		if (!hasRolesForRequest) {
			return await response
				.status(ResponseStatus.FORBIDDEN)
				.send();
		}
	};
};

export {
	checkRoles,
};
