import {
	prismaClient,
} from "@/db/client";
import {
	type UserId,
} from "@/models/users/types";
import {
	isNull,
} from "@/utilities/is-null";

import {
	type Permission,
} from "../types";

interface GetHasPermissionsParams {
	permissions: Array<Permission>;
	userId: UserId | undefined;
}

const getHasPermissions = async ({
	permissions,
	userId,
}: GetHasPermissionsParams): Promise<boolean> => {
	try {
		const foundPermissions = await Promise.all(
			permissions.map(async (permission) => {
				return await prismaClient.permission.findFirst({
					select: {
						id: true,
					},
					where: {
						action: permission.action,
						resource: permission.resource,
						roles: {
							some: {
								users: {
									some: {
										id: userId,
									},
								},
							},
						},
						scope: permission.scope,
					},
				});
			}),
		);

		return foundPermissions.some((foundPermission) => {
			return !isNull(foundPermission);
		});
	} catch (error) {
		console.error(error);

		return false;
	}
};

export {
	getHasPermissions,
};
