import { DATABASE, DATABASE_KEY } from "../constants";

// Inspired by: https://developer.mozilla.org/en-US/docs/Web/API/IDBFactory/open#examples
const initializeDatabase = (): void => {
	const DBOpenRequest = window.indexedDB.open(DATABASE_KEY);

	DBOpenRequest.onerror = () => {
		console.error("An error ocurred while connecting to the database.");
	};

	DBOpenRequest.onsuccess = () => {
		console.info("Successfully connected to the database.");

		Object.assign(DATABASE, DBOpenRequest.result);
	};
};

export { initializeDatabase };
