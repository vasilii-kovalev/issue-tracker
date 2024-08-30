import Dexie, { type Transaction, type EntityTable } from "dexie";

import type { User } from "models/user/types";
import { logError } from "utilities/log-error";

interface WithModels {
	users: EntityTable<User, "id">;
}

interface DatabaseWithModels extends Dexie, WithModels {}

interface TransactionWithModels extends Transaction, WithModels {}

let DATABASE = {} as DatabaseWithModels;

const initializeDatabase = () => {
	DATABASE = new Dexie("application-01") as DatabaseWithModels;

	DATABASE.version(1).stores({
		users: "++id, fullName, password, isActive",
	});

	DATABASE.on("ready", () => {
		console.info("Database is ready.");
	});

	DATABASE.on("populate", async (transaction) => {
		try {
			await (transaction as TransactionWithModels).users.bulkAdd([
				{
					id: "1",
					fullName: "Admin",
					password: "admin",
					isActive: true,
				},
			]);
		} catch (error) {
			logError(error);
		}
	});

	void DATABASE.open();
};

export { DATABASE, initializeDatabase };
