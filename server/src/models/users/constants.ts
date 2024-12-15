import {
	type Prisma,
} from "@prisma/client";

const USERS_ORDER_BY_DEFAULT: Array<Prisma.UserOrderByWithRelationInput> = [
	{
		name: "asc",
	},
];

export {
	USERS_ORDER_BY_DEFAULT,
};
