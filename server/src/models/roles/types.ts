import {
	type Role as GeneratedRole,
} from "@/db/prisma/client";

import {
	type RoleId,
} from "./constants";

interface RoleFull extends GeneratedRole {
	id: RoleId;
}

type Role = Pick<
	RoleFull,
	| "description"
	| "id"
>;

interface RoleFilter {
	description: string;
}

export type {
	Role,
	RoleFilter,
	RoleFull,
};
