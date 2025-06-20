import {
	generatePath,
} from "react-router";

import {
	type UserId,
} from "@/features/users/types";

import {
	RoutePath,
} from "../constants";

const getUserDashboardPath = (
	userId: UserId,
): string => {
	return generatePath(
		RoutePath.USER_DASHBOARD,
		{
			userId,
		},
	);
};

export {
	getUserDashboardPath,
};
