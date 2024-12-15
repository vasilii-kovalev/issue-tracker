import {
	type Prisma,
} from "@prisma/client";

import {
	type User,
} from "./types";

const USER_SELECTOR = {
	createdDate: true,
	email: true,
	id: true,
	name: true,
	roles: {
		select: {
			id: true,
		},
	},
	updatedDate: true,
} satisfies Required<
	Pick<
		Prisma.UserSelect,
		keyof User
	>
>;

export {
	USER_SELECTOR,
};
