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
			const status = ResponseStatus.FORBIDDEN;

			return await response
				.status(status)
				.send({
					status,
				});
		}
	};
};

export {
	checkPermissions,
};
