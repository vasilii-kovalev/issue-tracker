import {
	type FC,
	lazy,
	Suspense,
} from "react";
import {
	Navigate,
	Outlet,
	Route,
	Routes,
} from "react-router";

import {
	userApi,
} from "@/models/user/api";
import {
	ErrorPageNotFound,
} from "@/pages/error-page-not-found/page";
import {
	isUndefined,
} from "@/utilities/is-undefined";

const UserDashboard = lazy(async () => {
	return await import("@/pages/user-dashboard/page");
});

const LoginPage = lazy(async () => {
	return await import("@/pages/login/page");
});

const ProtectedRoute: FC = () => {
	const {
		data,
		isError,
		isFetching,
	} = userApi.endpoints.getCurrentUser.useQueryState(undefined);

	if (isFetching) {
		return null;
	}

	if (
		isError
		|| isUndefined(data)
	) {
		return (
			<Navigate
				replace={true}
				to="/login"
			/>
		);
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
						element={<LoginPage/>}
						path="/login"
					/>

					<Route
						element={<ErrorPageNotFound/>}
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
