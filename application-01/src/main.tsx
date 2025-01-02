import "./reset.css";
import "./main.css";

import {
	StrictMode,
} from "react";
import {
	createRoot,
} from "react-dom/client";
import {
	BrowserRouter,
} from "react-router";

import {
	Application,
} from "@/application/application";

const rootElement = document.getElementById("root");

if (rootElement !== null) {
	const root = createRoot(rootElement);

	root.render(
		<StrictMode>
			<BrowserRouter>
				<Application/>
			</BrowserRouter>
		</StrictMode>,
	);
}
