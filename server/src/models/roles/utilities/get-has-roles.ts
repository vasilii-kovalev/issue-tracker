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
	type RoleId,
} from "../constants";

interface GetHasRolesParams {
	roles: Array<RoleId>;
	userId: UserId | undefined;
}

const getHasRoles = async ({
	roles,
	userId,
}: GetHasRolesParams): Promise<boolean> => {
	try {
		const foundRoles = await Promise.all(
			roles.map(async (roleId) => {
				return await prismaClient.role.findFirst({
					select: {
						id: true,
					},
					where: {
						id: roleId,
						users: {
							some: {
								id: userId,
							},
						},
					},
				});
			}),
		);

		return foundRoles.some((foundRole) => {
			return !isNull(foundRole);
		});
	} catch (error) {
		console.error(error);

		return false;
	}
};

export {
	getHasRoles,
};
