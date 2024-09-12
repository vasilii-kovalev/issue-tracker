import {
	type onRequestAsyncHookHandler,
} from "fastify";

import {
	ResponseStatus,
} from "@/constants";
import {
	getUserIdFromJwtCookie,
} from "@/models/auth/utilities/get-user-id-from-jwt-cookie";

import {
	type PermissionId,
} from "../constants";
import {
	hasPermissions,
} from "../utilities/has-permissions";

const checkPermissions = (
	permissions: Array<PermissionId>,
): onRequestAsyncHookHandler => {
	return async function checkPermissionsHandler(request, response) {
		const userIdFromJwtCookie = getUserIdFromJwtCookie(
			this,
			request,
		);

		const hasPermissionsForRequest = await hasPermissions(
			userIdFromJwtCookie,
			permissions,
		);

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
