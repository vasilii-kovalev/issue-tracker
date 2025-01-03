import {
	type FC,
	lazy,
	Suspense,
} from "react";
import {
	Outlet,
	Route,
	Routes,
} from "react-router";

import {
	userApi,
} from "@/models/user/api";
import {
	ErrorPageNotFoundPage,
} from "@/pages/error-page-not-found/page";
import {
	isUndefined,
} from "@/utilities/is-undefined";

const UserDashboard = lazy(async () => {
	return await import("@/pages/user-dashboard/page");
});

const ProtectedRoute: FC = () => {
	const {
		data,
		error,
	} = userApi.endpoints.getCurrentUser.useQueryState(undefined);

	if (!isUndefined(error)) {
		return null;
	}

	if (isUndefined(data)) {
		return null;
	}

	return <Outlet/>;
};

const Application: FC = () => {
	userApi.endpoints.getCurrentUser.useQuery(undefined);

	return (
		<main>
			<Suspense
				fallback={null}
			>
				<Routes>
					<Route
						element={<ProtectedRoute/>}
					>
						<Route
							element={<UserDashboard/>}
							path="/users/:userId/dashboard"
						/>
					</Route>

					<Route
						element={<ErrorPageNotFoundPage/>}
						path="*"
					/>
				</Routes>
			</Suspense>
		</main>
	);
};

export {
	Application,
};
