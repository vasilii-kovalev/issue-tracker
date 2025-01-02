import {
	logError,
} from "./log-error";

interface GetDataFromLocalStorageParams<Data> {
	key: string;
	defaultValue: Data;
}

const getDataFromLocalStorage = <Data>({
	key,
	defaultValue,
}: GetDataFromLocalStorageParams<Data>): Data => {
	try {
		const rawData = window.localStorage.getItem(key);

		if (rawData === null) {
			return defaultValue;
		}

		return JSON.parse(rawData) as Data;
	} catch (error) {
		logError(error);

		return defaultValue;
	}
};

interface SetDataToLocalStorageParams {
	key: string;
	data: unknown;
}

const setDataToLocalStorage = ({
	key,
	data,
}: SetDataToLocalStorageParams): void => {
	try {
		const rawData = JSON.stringify(data);

		window.localStorage.setItem(
			key,
			rawData,
		);
	} catch (error) {
		logError(error);
	}
};

const deleteDataFromLocalStorage = (
	key: string,
): void => {
	try {
		window.localStorage.removeItem(key);
	} catch (error) {
		logError(error);
	}
};

export {
	deleteDataFromLocalStorage,
	getDataFromLocalStorage,
	setDataToLocalStorage,
};
