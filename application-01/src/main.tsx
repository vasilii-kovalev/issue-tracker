import { ErrorHandler, ErrorNotification, Snackbar, Text } from "@epam/loveship";
import { Modals } from "@epam/uui-components";
import { DragGhost, HistoryAdaptedRouter, useUuiServices, UuiContext, type UuiContexts } from "@epam/uui-core";
import { createBrowserHistory } from "history";
import { type FC, StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { Router } from "react-router-dom";

import { Application } from "application/application.tsx";
import { DATABASE, DATABASE_KEY } from "models/server/constants";
import { logError } from "utilities/log-error";

import "./reset.css";
import "@epam/uui-components/styles.css";
import "@epam/uui/styles.css";
import "@epam/loveship/styles.css";
import "./main.css";

const rootElement = document.getElementById("root");

if (rootElement !== null) {
	// Inspired by: https://developer.mozilla.org/en-US/docs/Web/API/IDBFactory/open#examples
	const initializeDatabase = (uuiContexts: UuiContexts): void => {
		const DBOpenRequest = window.indexedDB.open(DATABASE_KEY);

		DBOpenRequest.onerror = async () => {
			try {
				await uuiContexts.uuiNotifications.show((notificationProps) => {
					return (
						<ErrorNotification {...notificationProps}>
							<Text color="primary">Error ocurred when loading database.</Text>
						</ErrorNotification>
					);
				});
			} catch (error) {
				logError(error);
			}
		};

		DBOpenRequest.onsuccess = () => {
			console.info("Successfully connected to the database.");

			Object.assign(DATABASE, DBOpenRequest.result);
		};
	};

	const root = createRoot(rootElement);

	const history = createBrowserHistory();
	const router = new HistoryAdaptedRouter(history);

	const ApplicationWithProviders: FC = () => {
		const { services } = useUuiServices({
			router,
		});

		useEffect(() => {
			initializeDatabase(services);
		}, [services]);

		return (
			<StrictMode>
				<UuiContext.Provider value={services}>
					<ErrorHandler>
						<Router history={history}>
							<Application />
						</Router>
					</ErrorHandler>
					<Snackbar />
					<Modals />
					<DragGhost />
				</UuiContext.Provider>
			</StrictMode>
		);
	};

	root.render(<ApplicationWithProviders />);
}
