import {
	type FC,
} from "react";
import {
	Navigate,
} from "react-router";

import {
	usersApi,
} from "@/features/users/api";
import {
	isUndefined,
} from "@/utilities/is-undefined";

const CurrentUserDashboardPage: FC = () => {
	const {
		data,
	} = usersApi.endpoints.getCurrentUser.useQueryState(undefined);

	if (isUndefined(data)) {
		return null;
	}

	return (
		<Navigate
			replace={true}
			to={`/users/${data.id}`}
		/>
	);
};

export default CurrentUserDashboardPage;
