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
	type Permission,
} from "../types";
import {
	getHasPermissions,
} from "../utilities/get-has-permissions";

const checkPermissions = (
	permissions: Array<Permission>,
): onRequestAsyncHookHandler => {
	return async function checkPermissionsHandler(request, response) {
		const userIdFromJwtCookie = getUserIdFromJwtCookie(
			this,
			request,
		);

		const hasPermissionsForRequest = await getHasPermissions({
			permissions,
			userId: userIdFromJwtCookie,
		});

		if (!hasPermissionsForRequest) {
			return await response
				.status(ResponseStatus.FORBIDDEN)
				.send();
		}
	};
};

export {
	checkPermissions,
};
