import {
	UserModel,
} from "@/models/users/model";

import {
	userMocks,
} from "../users";

const populateUsers = async (): Promise<void> => {
	/*
		Checking if there are any users.
		`findOne` is used to make the search faster (instead of using `find` to get the whole list).
	*/
	const usersCount = await UserModel.collection.countDocuments();

	if (usersCount > 0) {
		return;
	}

	try {
		await UserModel.create(userMocks);
	} catch (error) {
		console.error(error);
	}
};

const populateData = async (): Promise<void> => {
	await Promise.all([
		populateUsers(),
	]);
};

export {
	populateData,
};
