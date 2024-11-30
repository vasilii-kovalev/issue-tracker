/* eslint-disable no-console */
import {
	PrismaClient,
} from "@prisma/client";

import {
	Permission,
	Role,
} from "@/models/permissions/constants";
import {
	hashUserPassword,
} from "@/models/users/utilities/user-password";

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

	const canManageUsersPermission = await prismaClient.permission.create({
		data: {
			id: Permission.CAN_MANAGE_USERS,
		},
	});

	console.timeEnd("Permissions have been created.");

	console.time("Roles have been created.");

	const adminRole = await prismaClient.role.create({
		data: {
			id: Role.ADMIN,
			permissions: {
				connect: [
					canManageUsersPermission,
				],
			},
		},
	});

	const userRole = await prismaClient.role.create({
		data: {
			id: Role.USER,
		},
	});

	console.timeEnd("Roles have been created.");

	console.time("Users have been created.");

	await prismaClient.user.create({
		data: {
			displayedName: "Admin",
			email: "admin@issue-tracker.com",
			password: await hashUserPassword("admin-password"),
			role: adminRole.id,
		},
		select: {
			id: true,
		},
	});

	await prismaClient.user.create({
		data: {
			displayedName: "User",
			email: "user@issue-tracker.com",
			password: await hashUserPassword("user-password"),
			role: userRole.id,
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
