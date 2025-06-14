import "@/styles/reset.css";
import "@epam/uui-components/styles.css";
import "@epam/uui/styles.css";
import "@epam/loveship/styles.css";

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
