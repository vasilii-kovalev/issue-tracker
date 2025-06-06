/* eslint-disable no-console */
import {
	PermissionId,
} from "@/models/permissions/constants";
import {
	RoleId,
} from "@/models/roles/constants";
import {
	hashUserPassword,
} from "@/models/users/utilities/user-password";

import {
	PrismaClient,
} from "./prisma/client";
import {
	type RoleWhereUniqueInput,
} from "./prisma/models";

const USER_ROLE_CONNECT_INPUTS: Array<RoleWhereUniqueInput> = [
	{
		id: RoleId.USER,
	},
];

const ADMIN_ROLE_CONNECT_INPUTS: Array<RoleWhereUniqueInput> = [
	{
		id: RoleId.USER,
	},
	{
		id: RoleId.ADMIN,
	},
];

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
		data: [
			{
				id: PermissionId.USER_CREATE_ANY,
			},
			{
				id: PermissionId.USER_DELETE_ANY,
			},
			{
				id: PermissionId.USER_UPDATE_ANY,
			},
			{
				id: PermissionId.USER_UPDATE_OWN,
			},
		],
	});

	console.timeEnd("Permissions have been created.");

	console.time("Roles have been created.");

	await prismaClient.role.create({
		data: {
			description: "User",
			id: RoleId.USER,
			permissions: {
				connect: {
					id: PermissionId.USER_UPDATE_OWN,
				},
			},
		},
	});

	await prismaClient.role.create({
		data: {
			description: "Admin",
			id: RoleId.ADMIN,
			permissions: {
				connect: [
					{
						id: PermissionId.USER_CREATE_ANY,
					},
					{
						id: PermissionId.USER_DELETE_ANY,
					},
					{
						id: PermissionId.USER_UPDATE_ANY,
					},
				],
			},
		},
	});

	console.timeEnd("Roles have been created.");

	console.time("Users have been created.");

	await prismaClient.user.create({
		data: {
			email: "user@issue-tracker.com",
			id: "user",
			name: "User",
			password: await hashUserPassword("user-password"),
			roles: {
				connect: USER_ROLE_CONNECT_INPUTS,
			},
		},
		select: {
			id: true,
		},
	});

	await prismaClient.user.create({
		data: {
			email: "admin@issue-tracker.com",
			id: "admin",
			name: "Admin",
			password: await hashUserPassword("admin-password"),
			roles: {
				connect: ADMIN_ROLE_CONNECT_INPUTS,
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
