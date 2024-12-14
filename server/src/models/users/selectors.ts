import {
	type Prisma,
} from "@prisma/client";

import {
	type User,
} from "./types";

const USER_SELECTOR = {
	createdDate: true,
	displayedName: true,
	email: true,
	id: true,
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
