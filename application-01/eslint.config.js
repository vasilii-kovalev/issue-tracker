import globals from "globals";

import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import typescript from "typescript-eslint";

const config = typescript.config({
	extends: [...typescript.configs.strictTypeChecked, ...typescript.configs.stylisticTypeChecked],
	files: ["**/*.{ts,tsx}"],
	languageOptions: {
		ecmaVersion: 2020,
		globals: globals.browser,
		parserOptions: {
			project: ["./tsconfig.node.json", "./tsconfig.app.json"],
			tsconfigRootDir: import.meta.dirname,
		},
	},
	plugins: {
		// @ts-ignore
		"react-hooks": reactHooks,
		"react-refresh": reactRefresh,
	},
	// @ts-ignore
	rules: {
		...reactHooks.configs.recommended.rules,
		"react-refresh/only-export-components": [
			"warn",
			{
				allowConstantExport: true,
			},
		],
	},
});

export default config;
