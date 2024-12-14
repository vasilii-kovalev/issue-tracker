/* eslint-disable no-console */
import {
	type Prisma,
	PrismaClient,
} from "@prisma/client";

import {
	Action,
	Resource,
	Role,
	Scope,
} from "@/models/permissions/constants";
import {
	type Permission,
	type PermissionId,
} from "@/models/permissions/types";
import {
	hashUserPassword,
} from "@/models/users/utilities/user-password";

const getPermissionId = (
	permission: Permission,
): PermissionId => {
	const {
		action,
		resource,
		scope,
	} = permission;

	return [
		resource,
		action,
		scope,
	].join(":");
};

const getPermissionCreateInput = (
	permission: Permission,
): Prisma.PermissionCreateManyInput => {
	const {
		action,
		resource,
		scope,
	} = permission;

	return {
		action,
		id: getPermissionId({
			action,
			resource,
			scope,
		}),
		resource,
		scope,
	};
};

const getPermissionCreateInputs = (): Array<Prisma.PermissionCreateManyInput> => {
	return [
		getPermissionCreateInput({
			action: Action.CREATE,
			resource: Resource.USER,
			scope: Scope.ANY,
		}),
		getPermissionCreateInput({
			action: Action.DELETE,
			resource: Resource.USER,
			scope: Scope.ANY,
		}),
		getPermissionCreateInput({
			action: Action.UPDATE,
			resource: Resource.USER,
			scope: Scope.ANY,
		}),
		getPermissionCreateInput({
			action: Action.UPDATE,
			resource: Resource.USER,
			scope: Scope.OWN,
		}),
	];
};

const getPermissionConnectInput = ({
	action,
	resource,
	scope,
}: Permission): Prisma.PermissionWhereUniqueInput => {
	return {
		id: getPermissionId({
			action,
			resource,
			scope,
		}),
	};
};

const getUserPermissionConnectInputs = (): Array<Prisma.PermissionWhereUniqueInput> => {
	return [
		getPermissionConnectInput({
			action: Action.UPDATE,
			resource: Resource.USER,
			scope: Scope.OWN,
		}),
	];
};

const getAdminPermissionConnectInputs = (): Array<Prisma.PermissionWhereUniqueInput> => {
	return [
		getPermissionConnectInput({
			action: Action.CREATE,
			resource: Resource.USER,
			scope: Scope.ANY,
		}),
		getPermissionConnectInput({
			action: Action.DELETE,
			resource: Resource.USER,
			scope: Scope.ANY,
		}),
		getPermissionConnectInput({
			action: Action.UPDATE,
			resource: Resource.USER,
			scope: Scope.ANY,
		}),
	];
};

const getUserRoleConnectInputs = (): Array<Prisma.RoleWhereUniqueInput> => {
	return [
		{
			id: Role.USER,
		},
	];
};

const getAdminRoleConnectInputs = (): Array<Prisma.RoleWhereUniqueInput> => {
	return [
		{
			id: Role.USER,
		},
		{
			id: Role.ADMIN,
		},
	];
};

const prismaClient = new PrismaClient();

const seed = async (): Promise<void> => {
	console.time("Database has been cleared.");

	await Promise.all([
		prismaClient.user.deleteMany(),
		prismaClient.role.deleteMany(),
		prismaClient.permission.deleteMany(),
	]);

	console.timeEnd("Database has been cleared.");

	console.log("Seeding...");

	console.time("Database has been seeded.");

	console.time("Permissions have been created.");

	await prismaClient.permission.createMany({
		data: getPermissionCreateInputs(),
	});

	console.timeEnd("Permissions have been created.");

	console.time("Roles have been created.");

	await prismaClient.role.create({
		data: {
			id: Role.USER,
			permissions: {
				connect: getUserPermissionConnectInputs(),
			},
		},
	});

	await prismaClient.role.create({
		data: {
			id: Role.ADMIN,
			permissions: {
				connect: getAdminPermissionConnectInputs(),
			},
		},
	});

	console.timeEnd("Roles have been created.");

	console.time("Users have been created.");

	await prismaClient.user.create({
		data: {
			displayedName: "User",
			email: "user@issue-tracker.com",
			id: "user",
			password: await hashUserPassword("user-password"),
			roles: {
				connect: getUserRoleConnectInputs(),
			},
		},
		select: {
			id: true,
		},
	});

	await prismaClient.user.create({
		data: {
			displayedName: "Admin",
			email: "admin@issue-tracker.com",
			id: "admin",
			password: await hashUserPassword("admin-password"),
			roles: {
				connect: getAdminRoleConnectInputs(),
			},
		},
		select: {
			id: true,
		},
	});

	console.timeEnd("Users have been created.");

	console.timeEnd("Database has been seeded.");
};

try {
	void seed();
} catch (error) {
	console.error(error);

	process.exit(1);
} finally {
	void prismaClient.$disconnect();
}
