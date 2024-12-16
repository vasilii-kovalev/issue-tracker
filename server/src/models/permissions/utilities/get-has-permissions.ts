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
	type PermissionId,
} from "../constants";

interface GetHasPermissionsParams {
	permissions: Array<PermissionId>;
	userId: UserId | undefined;
}

const getHasPermissions = async ({
	permissions,
	userId,
}: GetHasPermissionsParams): Promise<boolean> => {
	try {
		const foundPermissions = await Promise.all(
			permissions.map(async (permissionId) => {
				return await prismaClient.permission.findFirst({
					select: {
						id: true,
					},
					where: {
						id: permissionId,
						roles: {
							some: {
								users: {
									some: {
										id: userId,
									},
								},
							},
						},
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
