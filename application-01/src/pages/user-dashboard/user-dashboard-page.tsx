import {
	type FC,
	Fragment,
} from "react";

import {
	ResponseStatus,
} from "@/features/api/constants";
import {
	LoadingCode,
} from "@/features/i18n/constants";
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
import {
	PageCode,
} from "./i18n";

const UserDashboardPage: FC = () => {
	const {
		userId,
	} = useUserDashboardPageParams();

	const {
		data,
		isLoading,
		error,
	} = usersApi.endpoints.getUserById.useQuery(userId);

	if (isLoading) {
		return LoadingCode.GENERAL;
	}

	if (!isUndefined(error)) {
		if ("status" in error) {
			if (error.status === ResponseStatus.FORBIDDEN) {
				return (
					<ErrorForbiddenPage>
						{PageCode.USER_ACCESS_FORBIDDEN}
					</ErrorForbiddenPage>
				);
			}

			if (error.status === ResponseStatus.NOT_FOUND) {
				return PageCode.USER_NOT_FOUND;
			}
		}

		return <ErrorUnknownPage/>;
	}

	return (
		<Fragment>
			<h1>
				{PageCode.PAGE_HEADER}
			</h1>

			{
				!isUndefined(data)
					? (
						<p>
							{data.name}
						</p>
					)
					: null
			}
		</Fragment>
	);
};

export default UserDashboardPage;
