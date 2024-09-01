import react from "@vitejs/plugin-react";
import {
	defineConfig,
} from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config
const config = defineConfig({
	plugins: [
		tsconfigPaths({
			configNames: [
				"tsconfig.app.json",
			],
		}),
		react(),
	],
	server: {
		proxy: {
			// eslint-disable-next-line @typescript-eslint/naming-convention
			"/api": "http://localhost:5000",
		},
	},
});

export default config;
