import {
	type Prisma,
} from "@prisma/client";

import {
	PERMISSIONS_ORDER_BY_DEFAULT,
} from "@/models/permissions/constants";
import {
	USERS_ORDER_BY_DEFAULT,
} from "@/models/users/constants";

const ROLE_FULL_SELECTOR = {
	createdDate: true,
	id: true,
	permissions: {
		orderBy: PERMISSIONS_ORDER_BY_DEFAULT,
		select: {
			id: true,
		},
	},
	updatedDate: true,
	users: {
		orderBy: USERS_ORDER_BY_DEFAULT,
		select: {
			id: true,
		},
	},
} satisfies Prisma.RoleSelect;

export {
	ROLE_FULL_SELECTOR,
};
