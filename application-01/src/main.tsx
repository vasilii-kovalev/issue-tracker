import "@/styles/reset.css";
import "@/styles/theme.css";

import {
	createRoot,
} from "react-dom/client";

import {
	Application,
} from "@/application/application";
import {
	isNull,
} from "@/utilities/is-null";

const rootElement = document.getElementById("root");

if (!isNull(rootElement)) {
	const root = createRoot(rootElement);

	root.render(
		<Application/>,
	);
}
