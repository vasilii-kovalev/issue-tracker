import {
	Snackbar,
} from "@epam/loveship";
import {
	Modals,
} from "@epam/uui-components";
import {
	DragGhost,
	type HistoryAdaptedRouter,
	useUuiServices,
	UuiContext,
} from "@epam/uui-core";
import {
	type FC,
	StrictMode,
} from "react";
import {
	ErrorBoundary,
} from "react-error-boundary";
import {
	Provider,
} from "react-redux";
import {
	BrowserRouter,
} from "react-router";

import {
	PageSpinner,
} from "@/components/page-spinner/page-spinner";
import {
	ErrorUnknownPage,
} from "@/pages/error-unknown/page";
import {
	ApplicationRoutes,
} from "@/routes/routes";
import {
	store,
} from "@/store/store";
import {
	emptyFunction,
} from "@/utilities/empty-function";

const Application: FC = () => {
	const {
		services,
	} = useUuiServices({
		router: {
			block: emptyFunction,
			listen: emptyFunction,
		} as unknown as HistoryAdaptedRouter,
	});

	return (
		<StrictMode>
			<UuiContext
				value={services}
			>
				<BrowserRouter>
					<Provider
						store={store}
					>
						<main>
							<ErrorBoundary
								fallback={<ErrorUnknownPage/>}
							>
								<ApplicationRoutes/>
								<PageSpinner/>
							</ErrorBoundary>
						</main>
					</Provider>
				</BrowserRouter>

				<Snackbar/>
				<Modals/>
				<DragGhost/>
			</UuiContext>
		</StrictMode>
	);
};

export {
	Application,
};
