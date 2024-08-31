import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config
const config = defineConfig({
	plugins: [
		tsconfigPaths({
			configNames: ["tsconfig.app.json"],
		}),
		react(),
	],
	server: {
		proxy: {
			"/api": "http://localhost:5000",
		},
	},
});

export default config;
