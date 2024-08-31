import js from "@eslint/js";
import stylistic from "@stylistic/eslint-plugin";
import parser from "@typescript-eslint/parser";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import globals from "globals";
import typescript from "typescript-eslint";

/** @type {import("@typescript-eslint/utils").TSESLint.FlatConfig.ConfigArray} */
const config = typescript.config(
	{
		ignores: [
			"dist",
		],
		extends: [
			js.configs.recommended,
			// @ts-expect-error Unknown type error because of `stylisticConfig` type.
			...typescript.configs.strictTypeChecked,
			// @ts-expect-error Unknown type error because of `stylisticConfig` type.
			...typescript.configs.stylisticTypeChecked,
			// @ts-expect-error Though the type is incorrect, the config still works.
			stylistic.configs["all-flat"],
		],
		files: [
			"**/*.{ts,tsx}",
			"eslint.config.js",
		],
		languageOptions: {
			ecmaVersion: 2020,
			globals: globals.browser,
			parser,
			parserOptions: {
				project: [
					"tsconfig.app.json",
					"tsconfig.node.json",
					"tsconfig.config.json",
				],
				tsconfigRootDir: import.meta.dirname,
			},
		},
		plugins: {
			// @ts-expect-error Legacy plugin.
			"react-hooks": reactHooks,
			"react-refresh": reactRefresh,
			"simple-import-sort": simpleImportSort,
		},
		rules: {
			// https://eslint.org/docs/latest/rules/arrow-body-style
			"arrow-body-style": [
				"error",
				/*
					Always having the function's body allows to quicker add
					debugger, console.log, change the logic, etc.
				*/
				"always",
			],
			// https://eslint.org/docs/latest/rules/curly
			curly: [
				"error",
				/*
					This option makes the code more consistent and eliminates necessity
					to think which style to chose in case of one/multiple statements.
				*/
				"all",
			],
			// https://eslint.org/docs/latest/rules/one-var
			"one-var": [
				"error",
				/*
					Defining variables/constants on separate lines allows to
					quicker refactor and disable/enable them (for debugging purposes,
					for example), without touching unrelated code.
				*/
				"never",
			],

			// https://typescript-eslint.io/rules/array-type
			"@typescript-eslint/array-type": [
				"error",
				{
					default: "generic",
					readonly: "generic",
				},
			],
			// https://typescript-eslint.io/rules/consistent-type-imports
			"@typescript-eslint/consistent-type-imports": [
				"error",
				{
					prefer: "type-imports",
					disallowTypeAnnotations: true,
					fixStyle: "inline-type-imports",
				},
			],
			// https://typescript-eslint.io/rules/consistent-type-exports
			"@typescript-eslint/consistent-type-exports": [
				"error",
				{
					fixMixedExportsWithInlineTypeSpecifier: true,
				},
			],

			// https://github.com/facebook/react/tree/main/packages/eslint-plugin-react-hooks
			"react-hooks/exhaustive-deps": "warn",
			// https://github.com/facebook/react/tree/main/packages/eslint-plugin-react-hooks
			"react-hooks/rules-of-hooks": "error",

			// https://github.com/ArnaudBarre/eslint-plugin-react-refresh?tab=readme-ov-file#usage
			"react-refresh/only-export-components": [
				"error",
				{
					allowConstantExport: true,
				},
			],

			"simple-import-sort/imports": "error",
			"simple-import-sort/exports": "error",

			// https://eslint.style/rules/default/array-bracket-newline
			"@stylistic/array-bracket-newline": [
				"error",
				{
					multiline: true,
					minItems: 1,
				},
			],
			// https://eslint.style/rules/default/array-bracket-spacing
			"@stylistic/array-bracket-spacing": [
				"error",
				"never",
			],
			// https://eslint.style/rules/default/array-element-newline
			"@stylistic/array-element-newline": [
				"error",
				{
					ArrayExpression: "always",
					ArrayPattern: "always",
				},
			],
			// https://eslint.style/rules/default/arrow-parens
			"@stylistic/arrow-parens": [
				"error",
				/*
					Always having the parentheses solves two problems:
					1. It is always clear, that it is a function
					(see the "@stylistic/no-confusing-arrow" for more details)
					2. It is convenient to add/remove parameters without necessity to
					add/remove the parentheses
				*/
				"always",
			],
			// https://eslint.style/rules/default/arrow-spacing
			"@stylistic/arrow-spacing": [
				"error",
				{
					before: true,
					after: true,
				},
			],
			// https://eslint.style/rules/default/block-spacing
			"@stylistic/block-spacing": [
				"error",
				"never",
			],
			// https://eslint.style/rules/default/brace-style
			"@stylistic/brace-style": [
				"error",
				"1tbs",
				{
					allowSingleLine: false,
				},
			],
			// https://eslint.style/rules/default/comma-dangle
			"@stylistic/comma-dangle": [
				"error",
				/*
					Having trailing commas when having array items/object keys/values on
					multiple lines allows to easily swap/add/remove lines without
					necessity to add/remove the comma after the adjustments.
				*/
				"always-multiline",
			],
			// https://eslint.style/rules/default/comma-spacing
			"@stylistic/comma-spacing": [
				"error",
				{
					before: false,
					after: true,
				},
			],
			// https://eslint.style/rules/default/comma-style
			"@stylistic/comma-style": [
				"error",
				"last",
			],
			// https://eslint.style/rules/default/computed-property-spacing
			"@stylistic/computed-property-spacing": [
				"error",
				"never",
				{
					enforceForClassMembers: true,
				},
			],
			// https://eslint.style/rules/default/dot-location
			"@stylistic/dot-location": [
				"error",
				/*
					Having the dot alongside the property allows easily swap/add/remove
					lines without necessity to adjustment the object's line.
				*/
				"property",
			],
			// https://eslint.style/rules/default/eol-last
			"@stylistic/eol-last": [
				"error",
				"always",
			],
			// https://eslint.style/rules/default/function-call-argument-newline
			"@stylistic/function-call-argument-newline": [
				"error",
				"always",
			],
			// https://eslint.style/rules/default/function-call-spacing
			"@stylistic/function-call-spacing": [
				"error",
				"never",
			],
			// https://eslint.style/rules/default/function-paren-newline
			"@stylistic/function-paren-newline": [
				"error",
				"multiline-arguments",
			],
			// https://eslint.style/rules/default/generator-star-spacing
			"@stylistic/generator-star-spacing": [
				"error",
				"after",
			],
			// https://eslint.style/rules/default/implicit-arrow-linebreak
			/*
				This rule is disabled because the "arrow-body-style" one indirectly
				prohibits implicit returns, so we don't have to configure rules for such
				cases. It is also mentioned in that rule's documentation.
			*/
			"@stylistic/implicit-arrow-linebreak": "off",
			// https://eslint.style/rules/default/indent
			"@stylistic/indent": [
				"error",
				"tab",
			],
			// https://eslint.style/rules/default/indent-binary-ops
			"@stylistic/indent-binary-ops": [
				"error",
				"tab",
			],
			// https://eslint.style/rules/default/jsx-child-element-spacing
			"@stylistic/jsx-child-element-spacing": "warn",
			// https://eslint.style/rules/default/jsx-closing-bracket-location
			"@stylistic/jsx-closing-bracket-location": [
				"error",
				"line-aligned",
			],
			// https://eslint.style/rules/default/jsx-closing-tag-location
			"@stylistic/jsx-closing-tag-location": "error",
			// https://eslint.style/rules/default/jsx-curly-brace-presence
			"@stylistic/jsx-curly-brace-presence": [
				"error",
				"never",
			],
			// https://eslint.style/rules/default/jsx-curly-newline
			"@stylistic/jsx-curly-newline": [
				"error",
				{
					multiline: "consistent",
					singleline: "consistent",
				},
			],
			// https://eslint.style/rules/default/jsx-curly-spacing
			"@stylistic/jsx-curly-spacing": [
				"error",
				{
					when: "never",
					attributes: true,
					children: true,
				},
			],
			// https://eslint.style/rules/default/jsx-equals-spacing
			"@stylistic/jsx-equals-spacing": [
				"error",
				"never",
			],
			// https://eslint.style/rules/default/jsx-first-prop-new-line
			"@stylistic/jsx-first-prop-new-line": [
				"error",
				"always",
			],
			// https://eslint.style/rules/default/jsx-function-call-newline
			"@stylistic/jsx-function-call-newline": [
				"error",
				"always",
			],
			// https://eslint.style/rules/default/jsx-indent
			"@stylistic/jsx-indent": [
				"error",
				"tab",
				{
					checkAttributes: false,
					indentLogicalExpressions: true,
				},
			],
			// https://eslint.style/rules/default/jsx-indent-props
			"@stylistic/jsx-indent-props": [
				"error",
				"tab",
			],
			// https://eslint.style/rules/default/jsx-max-props-per-line
			"@stylistic/jsx-max-props-per-line": [
				"error",
				{
					maximum: 1,
					when: "always",
				},
			],
			// https://eslint.style/rules/default/jsx-newline
			/*
				This rule is disabled because separating JSX blocks by newlines makes
				it more readable.
			*/
			"@stylistic/jsx-newline": [
				"error",
				{
					prevent: true,
					allowMultilines: true,
				},
			],
			// https://eslint.style/rules/default/jsx-one-expression-per-line
			"@stylistic/jsx-one-expression-per-line": "error",
			// https://eslint.style/rules/default/jsx-pascal-case
			"@stylistic/jsx-pascal-case": [
				"error",
				{
					allowAllCaps: false,
					allowNamespace: false,
					allowLeadingUnderscore: false,
				},
			],
			// https://eslint.style/rules/default/jsx-props-no-multi-spaces
			"@stylistic/jsx-props-no-multi-spaces": "error",
			// https://eslint.style/rules/default/jsx-quotes
			"@stylistic/jsx-quotes": [
				"error",
				"prefer-double",
			],
			// https://eslint.style/rules/default/jsx-self-closing-comp
			"@stylistic/jsx-self-closing-comp": [
				"error",
				{
					component: true,
					html: true,
				},
			],
			// https://eslint.style/rules/default/jsx-sort-props
			"@stylistic/jsx-sort-props": "error",
			// https://eslint.style/rules/default/jsx-tag-spacing
			"@stylistic/jsx-tag-spacing": [
				"error",
				{
					/*
						This would simplify adding a new line to pass/remove props without
						necessity to add/remove the whitespace.
					*/
					closingSlash: "never",
					beforeSelfClosing: "never",
					afterOpening: "never",
					beforeClosing: "never",
				},
			],
			// https://eslint.style/rules/default/jsx-wrap-multilines
			"@stylistic/jsx-wrap-multilines": [
				"error",
				{
					declaration: "parens-new-line",
					assignment: "parens-new-line",
					return: "parens-new-line",
					arrow: "parens-new-line",
					condition: "parens-new-line",
					logical: "parens-new-line",
					prop: "parens-new-line",
					propertyValue: "parens-new-line",
				},
			],
			// https://eslint.style/rules/default/key-spacing
			"@stylistic/key-spacing": [
				"error",
				{
					beforeColon: false,
					afterColon: true,
					mode: "strict",
				},
			],
			// https://eslint.style/rules/default/keyword-spacing
			"@stylistic/keyword-spacing": [
				"error",
				{
					before: true,
					after: true,
				},
			],
			// https://eslint.style/rules/default/line-comment-position
			"@stylistic/line-comment-position": [
				"error",
				"above",
			],
			// https://eslint.style/rules/default/linebreak-style
			// This rule is disabled because the line break style doesn't really matter.
			"@stylistic/linebreak-style": "off",
			// https://eslint.style/rules/default/lines-around-comment
			"@stylistic/lines-around-comment": [
				"error",
				{
					beforeBlockComment: false,
					afterBlockComment: false,
					beforeLineComment: false,
					afterLineComment: false,
					allowBlockStart: false,
					allowBlockEnd: false,
					allowObjectStart: false,
					allowObjectEnd: false,
					allowArrayStart: false,
					allowArrayEnd: false,
					allowClassStart: false,
					allowClassEnd: false,
					afterHashbangComment: false,
				},
			],
			// https://eslint.style/rules/default/lines-between-class-members
			"@stylistic/lines-between-class-members": [
				"error",
				"always",
				{
					exceptAfterSingleLine: false,
					exceptAfterOverload: true,
				},
			],
			// https://eslint.style/rules/default/max-len
			"@stylistic/max-len": [
				"error",
				{
					code: 120,
					tabWidth: 2,
					ignoreComments: true,
					ignoreUrls: true,
					// This option is set to `true` to check long imports.
					ignoreStrings: false,
					ignoreTemplateLiterals: true,
					ignoreRegExpLiterals: true,
				},
			],
			// https://eslint.style/rules/default/max-statements-per-line
			"@stylistic/max-statements-per-line": [
				"error",
				{
					max: 1,
				},
			],
			// https://eslint.style/rules/default/member-delimiter-style
			"@stylistic/member-delimiter-style": [
				"error",
				{
					multiline: {
						delimiter: "semi",
						requireLast: true,
					},
					singleline: {
						delimiter: "semi",
						requireLast: false,
					},
					multilineDetection: "brackets",
				},
			],
			// https://eslint.style/rules/default/multiline-comment-style
			/*
				Each comment style is useful in different situation, so it is unnecessary
				to force only one.
			*/
			"@stylistic/multiline-comment-style": "off",
			// https://eslint.style/rules/default/multiline-ternary
			"@stylistic/multiline-ternary": [
				"error",
				"always-multiline",
			],
			// https://eslint.style/rules/default/new-parens
			"@stylistic/new-parens": [
				"error",
				"always",
			],
			// https://eslint.style/rules/default/newline-per-chained-call
			"@stylistic/newline-per-chained-call": [
				"error",
				{
					ignoreChainWithDepth: 2,
				},
			],
			// https://eslint.style/rules/default/no-confusing-arrow
			"@stylistic/no-confusing-arrow": [
				"error",
				{
					allowParens: false,
					onlyOneSimpleParam: false,
				},
			],
			// https://eslint.style/rules/default/no-extra-parens
			/*
				This rule is disabled because sometimes it is necessary to add parentheses
				to make code more readable or to fit it in the line.
			*/
			"@stylistic/no-extra-parens": "off",
			// https://eslint.style/rules/default/no-extra-semi
			"@stylistic/no-extra-semi": "error",
			// https://eslint.style/rules/default/no-floating-decimal
			"@stylistic/no-floating-decimal": "error",
			// https://eslint.style/rules/default/no-mixed-operators
			"@stylistic/no-mixed-operators": [
				"error",
				{
					groups: [
						[
							"+",
							"-",
							"*",
							"/",
							"%",
							"**",
						],
						[
							"&",
							"|",
							"^",
							"~",
							"<<",
							">>",
							">>>",
						],
						[
							"==",
							"!=",
							"===",
							"!==",
							">",
							">=",
							"<",
							"<=",
						],
						[
							"&&",
							"||",
						],
						[
							"in",
							"instanceof",
						],
					],
					allowSamePrecedence: true,
				},
			],
			// https://eslint.style/rules/default/no-mixed-spaces-and-tabs
			"@stylistic/no-mixed-spaces-and-tabs": "error",
			// https://eslint.style/rules/default/no-multi-spaces
			"@stylistic/no-multi-spaces": [
				"error",
				{
					ignoreEOLComments: false,
					includeTabs: true,
				},
			],
			// https://eslint.style/rules/default/no-multiple-empty-lines
			"@stylistic/no-multiple-empty-lines": [
				"error",
				{
					max: 1,
					maxEOF: 0,
					maxBOF: 0,
				},
			],
			// https://eslint.style/rules/default/no-tabs
			"@stylistic/no-tabs": [
				"error",
				{
					allowIndentationTabs: true,
				},
			],
			// https://eslint.style/rules/default/no-trailing-spaces
			"@stylistic/no-trailing-spaces": [
				"error",
				{
					skipBlankLines: false,
					ignoreComments: false,
				},
			],
			// https://eslint.style/rules/default/no-whitespace-before-property
			"@stylistic/no-whitespace-before-property": "error",
			// https://eslint.style/rules/default/nonblock-statement-body-position
			/*
				This rule is disabled because the "curly" rule adds blocks everywhere,
				which means there won't be cases this rule handles. It is also mentioned
				in this rule's documentation.
			*/
			"@stylistic/nonblock-statement-body-position": "off",
			// https://eslint.style/rules/default/object-curly-newline
			"@stylistic/object-curly-newline": [
				"error",
				/*
					This rule is configured to add new lines to non-empty objects
					to make it easier to read and modify them.
				*/
				{
					ObjectExpression: {
						multiline: true,
						minProperties: 1,
						consistent: true,
					},
					ObjectPattern: "always",
					ImportDeclaration: "always",
					ExportDeclaration: "always",
				},
			],
			// https://eslint.style/rules/default/object-curly-spacing
			"@stylistic/object-curly-spacing": [
				"error",
				"never",
				{
					arraysInObjects: false,
					objectsInObjects: false,
				},
			],
			// https://eslint.style/rules/default/object-property-newline
			"@stylistic/object-property-newline": [
				"error",
				{
					allowAllPropertiesOnSameLine: false,
				},
			],
			// https://eslint.style/rules/default/one-var-declaration-per-line
			// The "one-var" rule takes care of it.
			"@stylistic/one-var-declaration-per-line": "off",
			// https://eslint.style/rules/default/operator-linebreak
			"@stylistic/operator-linebreak": [
				"error",
				/*
					It is more readable when the operator and the operand it is applied to
					are on the same line. It also allows to easily
					swap/add/remove lines without necessity to adjust the lines above the
					changed ones.
				*/
				"before",
			],
			// https://eslint.style/rules/default/padded-blocks
			"@stylistic/padded-blocks": [
				"error",
				"never",
			],
			// https://eslint.style/rules/default/padding-line-between-statements
			"@stylistic/padding-line-between-statements": [
				"error",
				{
					blankLine: "always",
					prev: "*",
					next: [
						"break",
						"return",
						"throw",
						"class",
						"block-like",
						"export",
						"expression",
						"interface",
						"type",
					],
				},
				{
					blankLine: "always",
					prev: [
						"block-like",
						"expression",
					],
					next: "*",
				},
				{
					blankLine: "never",
					prev: "case",
					next: "block-like",
				},
				{
					blankLine: "always",
					prev: "block-like",
					next: "block-like",
				},
				{
					blankLine: "never",
					prev: "export",
					next: "export",
				},
			],
			// https://eslint.style/rules/default/quote-props
			"@stylistic/quote-props": [
				"error",
				"as-needed",
			],
			// https://eslint.style/rules/default/quotes
			"@stylistic/quotes": [
				"error",
				/*
					Ensures consistency between plain JavaScript/TypeScript code, JSX string
					props and JSON code.
				*/
				"double",
				{
					avoidEscape: true,
					allowTemplateLiterals: false,
					ignoreStringLiterals: false,
				},
			],
			// https://eslint.style/rules/default/rest-spread-spacing
			"@stylistic/rest-spread-spacing": [
				"error",
				"never",
			],
			// https://eslint.style/rules/default/semi
			"@stylistic/semi": [
				"error",
				"always",
				{
					omitLastInOneLineBlock: false,
					omitLastInOneLineClassBody: false,
				},
			],
			// https://eslint.style/rules/default/semi-spacing
			"@stylistic/semi-spacing": [
				"error",
				{
					before: false,
					after: true,
				},
			],
			// https://eslint.style/rules/default/semi-style
			"@stylistic/semi-style": [
				"error",
				"last",
			],
			// https://eslint.style/rules/default/space-before-blocks
			"@stylistic/space-before-blocks": [
				"error",
				"always",
			],
			// https://eslint.style/rules/default/space-before-function-paren
			"@stylistic/space-before-function-paren": [
				"error",
				{
					anonymous: "never",
					named: "never",
					asyncArrow: "always",
				},
			],
			// https://eslint.style/rules/default/space-in-parens
			"@stylistic/space-in-parens": [
				"error",
				"never",
			],
			// https://eslint.style/rules/default/space-infix-ops
			"@stylistic/space-infix-ops": [
				"error",
				{
					int32Hint: false,
				},
			],
			// https://eslint.style/rules/default/space-unary-ops
			"@stylistic/space-unary-ops": [
				"error",
				{
					words: true,
					nonwords: false,
				},
			],
			// https://eslint.style/rules/default/spaced-comment
			"@stylistic/spaced-comment": [
				"error",
				"always",
				{
					// For triple-slash TypeScript directives.
					markers: [
						"/",
					],
					block: {
						balanced: true,
					},
				},
			],
			// https://eslint.style/rules/default/switch-colon-spacing
			"@stylistic/switch-colon-spacing": [
				"error",
				{
					before: false,
					after: true,
				},
			],
			// https://eslint.style/rules/default/template-curly-spacing
			"@stylistic/template-curly-spacing": [
				"error",
				"never",
			],
			// https://eslint.style/rules/default/template-tag-spacing
			"@stylistic/template-tag-spacing": [
				"error",
				"never",
			],
			// https://eslint.style/rules/default/type-annotation-spacing
			"@stylistic/type-annotation-spacing": [
				"error",
				{
					before: true,
					after: true,
					overrides: {
						colon: {
							before: false,
							after: true,
						},
						arrow: {
							before: true,
							after: true,
						},
					},
				},
			],
			// https://eslint.style/rules/default/type-generic-spacing
			"@stylistic/type-generic-spacing": "error",
			// https://eslint.style/rules/default/type-named-tuple-spacing
			"@stylistic/type-named-tuple-spacing": "error",
			// https://eslint.style/rules/default/wrap-iife
			"@stylistic/wrap-iife": [
				"error",
				"inside",
				{
					functionPrototypeMethods: true,
				},
			],
			// https://eslint.style/rules/default/wrap-regex
			"@stylistic/wrap-regex": "error",
			// https://eslint.style/rules/default/yield-star-spacing
			"@stylistic/yield-star-spacing": [
				"error",
				{
					before: false,
					after: true,
				},
			],
		},
	},
	{
		files: [
			"eslint.config.js",
		],
		...typescript.configs.disableTypeChecked,
	},
);

export default config;
