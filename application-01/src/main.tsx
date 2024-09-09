import "./reset.css";
import "@epam/uui-components/styles.css";
import "@epam/uui/styles.css";
import "@epam/loveship/styles.css";
import "./main.css";

import {
	ErrorHandler,
	Snackbar,
} from "@epam/loveship";
import {
	Modals,
} from "@epam/uui-components";
import {
	DragGhost,
	HistoryAdaptedRouter,
	useUuiServices,
	UuiContext,
} from "@epam/uui-core";
// eslint-disable-next-line import-x/no-extraneous-dependencies
import {
	createBrowserHistory,
} from "history";
import {
	type FC,
	StrictMode,
	useEffect,
} from "react";
import {
	createRoot,
} from "react-dom/client";
import {
	Router,
} from "react-router-dom";

import {
	Application,
} from "@/application/application";
import {
	uuiContexts,
} from "@/constants/uui-contexts";

const rootElement = document.getElementById("root");

if (rootElement !== null) {
	const root = createRoot(rootElement);

	const history = createBrowserHistory();
	const router = new HistoryAdaptedRouter(history);

	// eslint-disable-next-line no-useless-assignment
	const ApplicationWithProviders: FC = () => {
		const {
			services,
		} = useUuiServices({
			router,
		});

		useEffect(
			() => {
				Object.assign(
					uuiContexts,
					services,
				);
			},
			[
				services,
			],
		);

		return (
			<StrictMode>
				<UuiContext.Provider
					value={services}
				>
					<ErrorHandler>
						<Router
							history={history}
						>
							<Application/>
						</Router>
					</ErrorHandler>

					<Snackbar/>
					<Modals/>
					<DragGhost/>
				</UuiContext.Provider>
			</StrictMode>
		);
	};

	root.render(
		<ApplicationWithProviders/>,
	);
}
