import {
	type Prisma,
} from "@prisma/client";

import {
	type User,
} from "./types";

const USER_SELECTOR: Required<
	Pick<
		Prisma.UserSelect,
		keyof User
	>
> = {
	displayedName: true,
	email: true,
	id: true,
	role: true,
};

export {
	USER_SELECTOR,
};
