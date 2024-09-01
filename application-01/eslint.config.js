import js from "@eslint/js";
import react from "@eslint-react/eslint-plugin";
import stylistic from "@stylistic/eslint-plugin";
import parser from "@typescript-eslint/parser";
import importExportNewline from "eslint-plugin-import-export-newline";
import noAutofix from "eslint-plugin-no-autofix";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import globals from "globals";
import typescript from "typescript-eslint";

/**
 * @typedef {import("eslint").Linter.StringSeverity} RuleSeverity
 */

/*
	Having the severity constants allows fast rule severity changes.
	For example, if necessary to turn off all the rules to check
	how auto-fix works for one of the rules, it would be necessary to set the
	constants' value to "off" and manually set the necessary severity of the rule.
*/

/** @type {RuleSeverity} */
const WARNING = "warn";

/** @type {RuleSeverity} */
const ERROR = "error";

/** @type {RuleSeverity} */
const DISABLED = "off";

/*
	Severity of the rules is set this way:
	* "error":
		* Ensures code consistency
		* Makes code more readable (easier to perceive) than without it
		* Prevents potential bugs and security issues
		* Improves debugging experience
		* Discourages using outdated syntax/approach
		* Discourages being lazy and write unmaintainable code
		* Discourages writing/leaving useless code
	* "warn":
		* Highlights potential problems, that need to be double checked before refactoring
	* "off":
		* Establishes unnecessary limits/conventions
		* Configures feature/syntax, which the project is not going to use
		* Another rule handles the same cases or causes conflicts

	Additional comments are provided for the rules if necessary.
*/

const config = typescript.config(
	{
		ignores: [
			"dist",
		],
		extends: [
			js.configs.recommended,
			...typescript.configs.strictTypeChecked,
			...typescript.configs.stylisticTypeChecked,
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
			"simple-import-sort": simpleImportSort,
			"import-export-newline": importExportNewline,
			// @ts-expect-error No types provided.
			"no-autofix": noAutofix,
		},
		rules: {
			// https://eslint.org/docs/latest/rules/arrow-body-style
			"arrow-body-style": [
				ERROR,
				/*
					Always having the function's body allows to quicker add
					debugger, console.log, change the logic, etc.
				*/
				"always",
			],
			// https://eslint.org/docs/latest/rules/curly
			curly: [
				ERROR,
				/*
					This option makes the code more consistent and eliminates necessity
					to think which style to chose in case of one/multiple statements.
				*/
				"all",
			],
			// https://eslint.org/docs/latest/rules/one-var
			"one-var": [
				ERROR,
				/*
					Defining variables/constants on separate lines allows to
					quicker refactor and disable/enable them (for debugging purposes,
					for example), without touching unrelated code.
				*/
				"never",
			],

			// https://typescript-eslint.io/rules/array-type
			"@typescript-eslint/array-type": [
				ERROR,
				{
					default: "generic",
					readonly: "generic",
				},
			],
			// https://typescript-eslint.io/rules/consistent-type-imports
			"@typescript-eslint/consistent-type-imports": [
				ERROR,
				{
					prefer: "type-imports",
					disallowTypeAnnotations: true,
					fixStyle: "inline-type-imports",
				},
			],
			// https://typescript-eslint.io/rules/consistent-type-exports
			"@typescript-eslint/consistent-type-exports": [
				ERROR,
				{
					fixMixedExportsWithInlineTypeSpecifier: true,
				},
			],

			// https://github.com/lydell/eslint-plugin-simple-import-sort/?tab=readme-ov-file#usage
			"simple-import-sort/imports": ERROR,
			// https://github.com/lydell/eslint-plugin-simple-import-sort/?tab=readme-ov-file#usage
			"simple-import-sort/exports": ERROR,

			// https://github.com/yay/eslint-plugin-import-export-newline?tab=readme-ov-file#usage
			"import-export-newline/import-declaration-newline": ERROR,
			// https://github.com/yay/eslint-plugin-import-export-newline?tab=readme-ov-file#usage
			"import-export-newline/export-declaration-newline": ERROR,

			// https://eslint.style/rules/default/array-bracket-newline
			"@stylistic/array-bracket-newline": [
				ERROR,
				{
					multiline: true,
					minItems: 1,
				},
			],
			// https://eslint.style/rules/default/array-bracket-spacing
			"@stylistic/array-bracket-spacing": [
				ERROR,
				"never",
			],
			// https://eslint.style/rules/default/array-element-newline
			"@stylistic/array-element-newline": [
				ERROR,
				{
					ArrayExpression: "always",
					ArrayPattern: "always",
				},
			],
			// https://eslint.style/rules/default/arrow-parens
			"@stylistic/arrow-parens": [
				ERROR,
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
				ERROR,
				{
					before: true,
					after: true,
				},
			],
			// https://eslint.style/rules/default/block-spacing
			"@stylistic/block-spacing": [
				ERROR,
				"never",
			],
			// https://eslint.style/rules/default/brace-style
			"@stylistic/brace-style": [
				ERROR,
				"1tbs",
				{
					allowSingleLine: false,
				},
			],
			// https://eslint.style/rules/default/comma-dangle
			"@stylistic/comma-dangle": [
				ERROR,
				/*
					Having trailing commas when having array items/object keys/values on
					multiple lines allows to easily swap/add/remove lines without
					necessity to add/remove the comma after the adjustments.
				*/
				"always-multiline",
			],
			// https://eslint.style/rules/default/comma-spacing
			"@stylistic/comma-spacing": [
				ERROR,
				{
					before: false,
					after: true,
				},
			],
			// https://eslint.style/rules/default/comma-style
			"@stylistic/comma-style": [
				ERROR,
				"last",
			],
			// https://eslint.style/rules/default/computed-property-spacing
			"@stylistic/computed-property-spacing": [
				ERROR,
				"never",
				{
					enforceForClassMembers: true,
				},
			],
			// https://eslint.style/rules/default/dot-location
			"@stylistic/dot-location": [
				ERROR,
				/*
					Having the dot alongside the property allows easily swap/add/remove
					lines without necessity to adjustment the object's line.
				*/
				"property",
			],
			// https://eslint.style/rules/default/eol-last
			"@stylistic/eol-last": [
				ERROR,
				"always",
			],
			// https://eslint.style/rules/default/function-call-argument-newline
			"@stylistic/function-call-argument-newline": [
				ERROR,
				"always",
			],
			// https://eslint.style/rules/default/function-call-spacing
			"@stylistic/function-call-spacing": [
				ERROR,
				"never",
			],
			// https://eslint.style/rules/default/function-paren-newline
			"@stylistic/function-paren-newline": [
				ERROR,
				"multiline-arguments",
			],
			// https://eslint.style/rules/default/generator-star-spacing
			"@stylistic/generator-star-spacing": [
				ERROR,
				"after",
			],
			// https://eslint.style/rules/default/implicit-arrow-linebreak
			/*
				This rule is disabled because the "arrow-body-style" one indirectly
				prohibits implicit returns, so we don't have to configure rules for such
				cases. It is also mentioned in that rule's documentation.
			*/
			"@stylistic/implicit-arrow-linebreak": DISABLED,
			// https://eslint.style/rules/default/indent
			"@stylistic/indent": [
				ERROR,
				"tab",
			],
			// https://eslint.style/rules/default/indent-binary-ops
			"@stylistic/indent-binary-ops": [
				ERROR,
				"tab",
			],
			// https://eslint.style/rules/default/jsx-child-element-spacing
			"@stylistic/jsx-child-element-spacing": WARNING,
			// https://eslint.style/rules/default/jsx-closing-bracket-location
			"@stylistic/jsx-closing-bracket-location": [
				ERROR,
				"line-aligned",
			],
			// https://eslint.style/rules/default/jsx-closing-tag-location
			"@stylistic/jsx-closing-tag-location": ERROR,
			// https://eslint.style/rules/default/jsx-curly-brace-presence
			"@stylistic/jsx-curly-brace-presence": [
				ERROR,
				"never",
			],
			// https://eslint.style/rules/default/jsx-curly-newline
			"@stylistic/jsx-curly-newline": [
				ERROR,
				{
					multiline: "consistent",
					singleline: "consistent",
				},
			],
			// https://eslint.style/rules/default/jsx-curly-spacing
			"@stylistic/jsx-curly-spacing": [
				ERROR,
				{
					when: "never",
					attributes: true,
					children: true,
				},
			],
			// https://eslint.style/rules/default/jsx-equals-spacing
			"@stylistic/jsx-equals-spacing": [
				ERROR,
				"never",
			],
			// https://eslint.style/rules/default/jsx-first-prop-new-line
			"@stylistic/jsx-first-prop-new-line": [
				ERROR,
				"always",
			],
			// https://eslint.style/rules/default/jsx-function-call-newline
			"@stylistic/jsx-function-call-newline": [
				ERROR,
				"always",
			],
			// https://eslint.style/rules/default/jsx-indent
			"@stylistic/jsx-indent": [
				ERROR,
				"tab",
				{
					checkAttributes: false,
					indentLogicalExpressions: true,
				},
			],
			// https://eslint.style/rules/default/jsx-indent-props
			"@stylistic/jsx-indent-props": [
				ERROR,
				"tab",
			],
			// https://eslint.style/rules/default/jsx-max-props-per-line
			"@stylistic/jsx-max-props-per-line": [
				ERROR,
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
				ERROR,
				{
					prevent: true,
					allowMultilines: true,
				},
			],
			// https://eslint.style/rules/default/jsx-one-expression-per-line
			"@stylistic/jsx-one-expression-per-line": ERROR,
			// https://eslint.style/rules/default/jsx-pascal-case
			"@stylistic/jsx-pascal-case": [
				ERROR,
				{
					allowAllCaps: false,
					allowNamespace: false,
					allowLeadingUnderscore: false,
				},
			],
			// https://eslint.style/rules/default/jsx-props-no-multi-spaces
			"@stylistic/jsx-props-no-multi-spaces": ERROR,
			// https://eslint.style/rules/default/jsx-quotes
			"@stylistic/jsx-quotes": [
				ERROR,
				"prefer-double",
			],
			// https://eslint.style/rules/default/jsx-self-closing-comp
			"@stylistic/jsx-self-closing-comp": [
				ERROR,
				{
					component: true,
					html: true,
				},
			],
			// https://eslint.style/rules/default/jsx-sort-props
			"@stylistic/jsx-sort-props": ERROR,
			// https://eslint.style/rules/default/jsx-tag-spacing
			"@stylistic/jsx-tag-spacing": [
				ERROR,
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
				ERROR,
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
				ERROR,
				{
					beforeColon: false,
					afterColon: true,
					mode: "strict",
				},
			],
			// https://eslint.style/rules/default/keyword-spacing
			"@stylistic/keyword-spacing": [
				ERROR,
				{
					before: true,
					after: true,
				},
			],
			// https://eslint.style/rules/default/line-comment-position
			"@stylistic/line-comment-position": [
				ERROR,
				"above",
			],
			// https://eslint.style/rules/default/linebreak-style
			// This rule is disabled because the line break style doesn't really matter.
			"@stylistic/linebreak-style": DISABLED,
			// https://eslint.style/rules/default/lines-around-comment
			"@stylistic/lines-around-comment": [
				ERROR,
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
				ERROR,
				"always",
				{
					exceptAfterSingleLine: false,
					exceptAfterOverload: true,
				},
			],
			// https://eslint.style/rules/default/max-len
			"@stylistic/max-len": [
				ERROR,
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
				ERROR,
				{
					max: 1,
				},
			],
			// https://eslint.style/rules/default/member-delimiter-style
			"@stylistic/member-delimiter-style": [
				ERROR,
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
			"@stylistic/multiline-comment-style": DISABLED,
			// https://eslint.style/rules/default/multiline-ternary
			"@stylistic/multiline-ternary": [
				ERROR,
				"always-multiline",
			],
			// https://eslint.style/rules/default/new-parens
			"@stylistic/new-parens": [
				ERROR,
				"always",
			],
			// https://eslint.style/rules/default/newline-per-chained-call
			"@stylistic/newline-per-chained-call": [
				ERROR,
				{
					ignoreChainWithDepth: 2,
				},
			],
			// https://eslint.style/rules/default/no-confusing-arrow
			"@stylistic/no-confusing-arrow": [
				ERROR,
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
			"@stylistic/no-extra-parens": DISABLED,
			// https://eslint.style/rules/default/no-extra-semi
			"@stylistic/no-extra-semi": ERROR,
			// https://eslint.style/rules/default/no-floating-decimal
			"@stylistic/no-floating-decimal": ERROR,
			// https://eslint.style/rules/default/no-mixed-operators
			"@stylistic/no-mixed-operators": [
				ERROR,
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
			"@stylistic/no-mixed-spaces-and-tabs": ERROR,
			// https://eslint.style/rules/default/no-multi-spaces
			"@stylistic/no-multi-spaces": [
				ERROR,
				{
					ignoreEOLComments: false,
					includeTabs: true,
				},
			],
			// https://eslint.style/rules/default/no-multiple-empty-lines
			"@stylistic/no-multiple-empty-lines": [
				ERROR,
				{
					max: 1,
					maxEOF: 0,
					maxBOF: 0,
				},
			],
			// https://eslint.style/rules/default/no-tabs
			"@stylistic/no-tabs": [
				ERROR,
				{
					allowIndentationTabs: true,
				},
			],
			// https://eslint.style/rules/default/no-trailing-spaces
			"@stylistic/no-trailing-spaces": [
				ERROR,
				{
					skipBlankLines: false,
					ignoreComments: false,
				},
			],
			// https://eslint.style/rules/default/no-whitespace-before-property
			"@stylistic/no-whitespace-before-property": ERROR,
			// https://eslint.style/rules/default/nonblock-statement-body-position
			/*
				This rule is disabled because the "curly" rule adds blocks everywhere,
				which means there won't be cases this rule handles. It is also mentioned
				in this rule's documentation.
			*/
			"@stylistic/nonblock-statement-body-position": DISABLED,
			// https://eslint.style/rules/default/object-curly-newline
			"@stylistic/object-curly-newline": [
				ERROR,
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
				ERROR,
				"never",
				{
					arraysInObjects: false,
					objectsInObjects: false,
				},
			],
			// https://eslint.style/rules/default/object-property-newline
			"@stylistic/object-property-newline": [
				ERROR,
				{
					allowAllPropertiesOnSameLine: false,
				},
			],
			// https://eslint.style/rules/default/one-var-declaration-per-line
			// The "one-var" rule takes care of it.
			"@stylistic/one-var-declaration-per-line": DISABLED,
			// https://eslint.style/rules/default/operator-linebreak
			"@stylistic/operator-linebreak": [
				ERROR,
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
				ERROR,
				"never",
			],
			// https://eslint.style/rules/default/padding-line-between-statements
			"@stylistic/padding-line-between-statements": [
				ERROR,
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
				ERROR,
				"as-needed",
			],
			// https://eslint.style/rules/default/quotes
			"@stylistic/quotes": [
				ERROR,
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
				ERROR,
				"never",
			],
			// https://eslint.style/rules/default/semi
			"@stylistic/semi": [
				ERROR,
				"always",
				{
					omitLastInOneLineBlock: false,
					omitLastInOneLineClassBody: false,
				},
			],
			// https://eslint.style/rules/default/semi-spacing
			"@stylistic/semi-spacing": [
				ERROR,
				{
					before: false,
					after: true,
				},
			],
			// https://eslint.style/rules/default/semi-style
			"@stylistic/semi-style": [
				ERROR,
				"last",
			],
			// https://eslint.style/rules/default/space-before-blocks
			"@stylistic/space-before-blocks": [
				ERROR,
				"always",
			],
			// https://eslint.style/rules/default/space-before-function-paren
			"@stylistic/space-before-function-paren": [
				ERROR,
				{
					anonymous: "never",
					named: "never",
					asyncArrow: "always",
				},
			],
			// https://eslint.style/rules/default/space-in-parens
			"@stylistic/space-in-parens": [
				ERROR,
				"never",
			],
			// https://eslint.style/rules/default/space-infix-ops
			"@stylistic/space-infix-ops": [
				ERROR,
				{
					int32Hint: false,
				},
			],
			// https://eslint.style/rules/default/space-unary-ops
			"@stylistic/space-unary-ops": [
				ERROR,
				{
					words: true,
					nonwords: false,
				},
			],
			// https://eslint.style/rules/default/spaced-comment
			"@stylistic/spaced-comment": [
				ERROR,
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
				ERROR,
				{
					before: false,
					after: true,
				},
			],
			// https://eslint.style/rules/default/template-curly-spacing
			"@stylistic/template-curly-spacing": [
				ERROR,
				"never",
			],
			// https://eslint.style/rules/default/template-tag-spacing
			"@stylistic/template-tag-spacing": [
				ERROR,
				"never",
			],
			// https://eslint.style/rules/default/type-annotation-spacing
			"@stylistic/type-annotation-spacing": [
				ERROR,
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
			"@stylistic/type-generic-spacing": ERROR,
			// https://eslint.style/rules/default/type-named-tuple-spacing
			"@stylistic/type-named-tuple-spacing": ERROR,
			// https://eslint.style/rules/default/wrap-iife
			"@stylistic/wrap-iife": [
				ERROR,
				"inside",
				{
					functionPrototypeMethods: true,
				},
			],
			// https://eslint.style/rules/default/wrap-regex
			"@stylistic/wrap-regex": ERROR,
			// https://eslint.style/rules/default/yield-star-spacing
			"@stylistic/yield-star-spacing": [
				ERROR,
				{
					before: false,
					after: true,
				},
			],
		},
	},
	{
		files: [
			"**/*.tsx",
		],
		extends: [
			react.configs["recommended-type-checked"],
		],
		plugins: {
			"react-hooks": reactHooks,
			"react-refresh": reactRefresh,
		},
		rules: {
			// https://github.com/facebook/react/tree/main/packages/eslint-plugin-react-hooks
			"react-hooks/exhaustive-deps": WARNING,
			// https://github.com/facebook/react/tree/main/packages/eslint-plugin-react-hooks
			"react-hooks/rules-of-hooks": ERROR,

			// https://github.com/ArnaudBarre/eslint-plugin-react-refresh?tab=readme-ov-file#usage
			"react-refresh/only-export-components": [
				ERROR,
				{
					allowConstantExport: true,
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
