import {
	type Prisma,
} from "@prisma/client";

enum RoleId {
	ADMIN = "ADMIN",
	USER = "USER",
}

enum Resource {
	USER = "USER",
}

enum Action {
	CREATE = "CREATE",
	DELETE = "DELETE",
	READ = "READ",
	UPDATE = "UPDATE",
}

enum Scope {
	ANY = "ANY",
	OWN = "OWN",
}

const PERMISSIONS_ORDER_BY_DEFAULT: Array<Prisma.PermissionOrderByWithRelationInput> = [
	{
		id: "asc",
	},
];

const ROLES_ORDER_BY_DEFAULT: Array<Prisma.RoleOrderByWithRelationInput> = [
	{
		id: "asc",
	},
];

export {
	Action,
	PERMISSIONS_ORDER_BY_DEFAULT,
	Resource,
	RoleId,
	ROLES_ORDER_BY_DEFAULT,
	Scope,
};
