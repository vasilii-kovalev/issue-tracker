import {
	prismaClient,
} from "@/db/client";
import {
	type UserId,
} from "@/models/users/types";
import {
	isEmpty,
} from "@/utilities/is-empty";

import {
	type Permission,
} from "../constants";

const hasPermissions = async (
	userId: UserId | undefined,
	permissions: Array<Permission>,
): Promise<boolean> => {
	try {
		const foundPermissions = await prismaClient.permission.findMany({
			select: {
				id: true,
			},
			where: {
				id: {
					in: permissions,
				},
				roles: {
					every: {
						users: {
							every: {
								id: userId,
							},
						},
					},
				},
			},
		});

		return !isEmpty(foundPermissions);
	} catch (error) {
		console.error(error);

		return false;
	}
};

export {
	hasPermissions,
};
