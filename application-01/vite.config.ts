import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
const config = defineConfig({
	plugins: [
		tsconfigPaths({
			configNames: ["tsconfig.app.json"],
		}),
		react(),
	],
	base: "/issue-tracker/applications/application-01",
	build: {
		outDir: "../applications/application-01",
		emptyOutDir: true,
	},
});

export default config;
