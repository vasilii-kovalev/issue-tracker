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
	useLocation,
} from "react-router";

import {
	usersApi,
} from "@/features/users/api";
import {
	ErrorNotFoundPage,
} from "@/pages/error-not-found/page";
import {
	isUndefined,
} from "@/utilities/is-undefined";

const CurrentUserDashboardPage = lazy(async () => {
	return await import("@/pages/current-user-dashboard/page");
});

const UserDashboard = lazy(async () => {
	return await import("@/pages/user-dashboard/page");
});

const LoginPage = lazy(async () => {
	return await import("@/pages/login/page");
});

const ProtectedRoute: FC = () => {
	const location = useLocation();

	const {
		data,
		isUninitialized,
		isFetching,
		isLoading,
		error,
	} = usersApi.endpoints.getCurrentUser.useQuery(undefined);

	if (
		isUninitialized
		|| isLoading
		|| isFetching
	) {
		return null;
	}

	if (
		!isUndefined(error)
		|| isUndefined(data)
	) {
		return (
			<Navigate
				replace={true}
				state={{
					from: location,
				}}
				to="/login"
			/>
		);
	}

	return <Outlet/>;
};

const ApplicationRoutes: FC = () => {
	return (
		<Suspense
			fallback={null}
		>
			<Routes>
				<Route
					element={<ProtectedRoute/>}
				>
					<Route
						element={<CurrentUserDashboardPage/>}
						path="/"
					/>

					<Route
						element={<UserDashboard/>}
						path="/users/:userId"
					/>
				</Route>

				<Route
					element={<LoginPage/>}
					path="/login"
				/>

				<Route
					element={<ErrorNotFoundPage/>}
					path="*"
				/>
			</Routes>
		</Suspense>
	);
};

export {
	ApplicationRoutes,
};
