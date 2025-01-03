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
	ErrorPageNotFoundPage,
} from "@/pages/error-page-not-found/page";

const UserDashboard = lazy(async () => {
	return await import("@/pages/user-dashboard/page");
});

const Application: FC = () => {
	return (
		<main>
			<Suspense
				fallback={null}
			>
				<Routes>
					<Route
						element={<UserDashboard/>}
						path="/users/:userId/dashboard"
					/>

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
