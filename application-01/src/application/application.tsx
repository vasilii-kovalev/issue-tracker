import {
	type FC,
	lazy,
	Suspense,
} from "react";
import {
	Route,
	Routes,
} from "react-router";

import {
	ErrorPageNotFound,
} from "@/pages/error-page-not-found/error-page-not-found";

const UserDashboard = lazy(async () => {
	return await import("@/pages/user-dashboard/user-dashboard");
});

const Application: FC = () => {
	return (
		<Suspense
			fallback={null}
		>
			<Routes>
				<Route
					element={<UserDashboard/>}
					path="/users/:userId/dashboard"
				/>

				<Route
					element={<ErrorPageNotFound/>}
					path="*"
				/>
			</Routes>
		</Suspense>
	);
};

export {
	Application,
};
