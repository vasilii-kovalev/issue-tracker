import {
	type FC,
	Fragment,
} from "react";
import {
	useNavigate,
} from "react-router";

import {
	HttpStatus,
} from "@/constants";
import {
	usersApi,
} from "@/features/users/api";
import {
	useUserDashboardPageParams,
} from "@/routes/hooks/use-params";
import {
	isUndefined,
} from "@/utilities/is-undefined";

import {
	ErrorForbiddenPage,
} from "../error-forbidden/page";
import {
	ErrorUnknownPage,
} from "../error-unknown/page";

const UserDashboardPage: FC = () => {
	const {
		userId,
	} = useUserDashboardPageParams();
	const navigate = useNavigate();

	const {
		data,
		isLoading,
		error,
	} = usersApi.endpoints.getUserById.useQuery(userId);

	if (isLoading) {
		return "Loading...";
	}

	if (!isUndefined(error)) {
		if ("status" in error) {
			if (error.status === HttpStatus.FORBIDDEN) {
				return <ErrorForbiddenPage/>;
			}

			if (error.status === HttpStatus.NOT_FOUND) {
				return "User not found";
			}
		}

		return <ErrorUnknownPage/>;
	}

	return (
		<Fragment>
			<h1>
				User dashboard
			</h1>

			{
				!isUndefined(data)
					? (
						<p>
							{data.name}
						</p>
					)
					: "No data to display"
			}

			<button
				onClick={() => {
					void navigate("/");
				}}
				type="button"
			>
				Click
			</button>
		</Fragment>
	);
};

export default UserDashboardPage;
