import "ui/react/theme.css";
import "./reset.css";

import {
	StrictMode,
} from "react";
import {
	createRoot,
} from "react-dom/client";
import {
	Provider,
} from "react-redux";
import {
	BrowserRouter,
} from "react-router";

import {
	Application,
} from "@/application/application";
import {
	store,
} from "@/store";

const rootElement = document.getElementById("root");

if (rootElement !== null) {
	const root = createRoot(rootElement);

	root.render(
		<StrictMode>
			<BrowserRouter>
				<Provider
					store={store}
				>
					<Application/>
				</Provider>
			</BrowserRouter>
		</StrictMode>,
	);
}
