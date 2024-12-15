import {
	type Prisma,
} from "@prisma/client";

enum RoleId {
	ADMIN = "ADMIN",
	USER = "USER",
}

const ROLES_ORDER_BY_DEFAULT: Array<Prisma.RoleOrderByWithRelationInput> = [
	{
		id: "asc",
	},
];

export {
	RoleId,
	ROLES_ORDER_BY_DEFAULT,
};
