/**
 * @param {unknown} value
 * @returns {value is string}
 */
const isString = (
	value,
) => {
	return typeof value === "string";
};

/**
 * @typedef {import("stylelint").RuleMessage} RuleMessage
 */

// Word case RegExp strings.
// https://stylelint.io/user-guide/configure/#rules:~:text=You%20can%20enforce%20these%20common%20cases

const KEBAB_CASE_REGEXP_STRING = "([a-z][a-z0-9]*)(-[a-z0-9]+)*";

const CAMEL_CASE_REGEXP_STRING = "[a-z][a-zA-Z0-9]+";

/**
 * @typedef {import("stylelint").Severity} RuleSeverity
 */

// Severity constants.

/*
	Having the severity constants allows fast rule severity changes.
	For example, if necessary to turn off all the rules to check
	how auto-fix works for one of the rules, it would be necessary to set the
	constants' value to "off" and manually set the necessary severity of the rule.
*/

/** @type {RuleSeverity} */
const WARNING = "warning";

/** @type {RuleSeverity} */
const ERROR = "error";

const DISABLED = null;

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
		* Configures feature/syntax, which we are not going to use
		* Another rule handles the same cases or causes conflicts

	Additional comments are provided for the rules if necessary.
*/

/** @type {import("stylelint").Config} */
const stylelintConfig = {
	// Prevent Stylelint and IDEs from checking JSX syntax.
	ignoreFiles: [
		"!**/*.css",
	],
	plugins: [
		// https://github.com/hudochenkov/stylelint-order
		"stylelint-order",
		// https://github.com/stylelint-stylistic/stylelint-stylistic
		"@stylistic/stylelint-plugin",
	],
	rules: {
		/*
			==================================================
			Built-in rules
			==================================================
		*/

		// Avoid errors.

		// Deprecated.

		// https://stylelint.io/user-guide/rules/at-rule-no-deprecated
		"at-rule-no-deprecated": [
			true,
			{
				severity: ERROR,
			},
		],
		// https://stylelint.io/user-guide/rules/declaration-property-value-keyword-no-deprecated
		"declaration-property-value-keyword-no-deprecated": [
			true,
			{
				severity: ERROR,
			},
		],

		// Descending.

		// https://stylelint.io/user-guide/rules/no-descending-specificity
		"no-descending-specificity": [
			true,
			{
				severity: WARNING,
			},
		],

		// Duplicate.

		// https://stylelint.io/user-guide/rules/declaration-block-no-duplicate-custom-properties
		"declaration-block-no-duplicate-custom-properties": [
			true,
			{
				severity: ERROR,
			},
		],
		// https://stylelint.io/user-guide/rules/declaration-block-no-duplicate-properties
		"declaration-block-no-duplicate-properties": [
			true,
			{
				severity: ERROR,
			},
		],
		// https://stylelint.io/user-guide/rules/font-family-no-duplicate-names
		"font-family-no-duplicate-names": [
			true,
			{
				severity: ERROR,
			},
		],
		// https://stylelint.io/user-guide/rules/keyframe-block-no-duplicate-selectors
		"keyframe-block-no-duplicate-selectors": [
			true,
			{
				severity: ERROR,
			},
		],
		// https://stylelint.io/user-guide/rules/no-duplicate-at-import-rules
		"no-duplicate-at-import-rules": [
			true,
			{
				severity: ERROR,
			},
		],
		// https://stylelint.io/user-guide/rules/no-duplicate-selectors
		"no-duplicate-selectors": [
			true,
			{
				severity: ERROR,
			},
		],

		// Empty.

		// https://stylelint.io/user-guide/rules/block-no-empty
		"block-no-empty": [
			true,
			{
				severity: ERROR,
			},
		],
		// https://stylelint.io/user-guide/rules/comment-no-empty
		"comment-no-empty": [
			true,
			{
				severity: ERROR,
			},
		],
		// https://stylelint.io/user-guide/rules/no-empty-source
		"no-empty-source": [
			true,
			{
				severity: ERROR,
			},
		],

		// Invalid.

		// https://stylelint.io/user-guide/rules/at-rule-prelude-no-invalid
		"at-rule-prelude-no-invalid": [
			true,
			{
				severity: ERROR,
			},
		],
		// https://stylelint.io/user-guide/rules/color-no-invalid-hex
		"color-no-invalid-hex": [
			true,
			{
				severity: ERROR,
			},
		],
		// https://stylelint.io/user-guide/rules/function-calc-no-unspaced-operator
		"function-calc-no-unspaced-operator": [
			true,
			{
				severity: ERROR,
			},
		],
		// https://stylelint.io/user-guide/rules/keyframe-declaration-no-important
		"keyframe-declaration-no-important": [
			true,
			{
				severity: ERROR,
			},
		],
		// https://stylelint.io/user-guide/rules/media-query-no-invalid
		"media-query-no-invalid": [
			true,
			{
				severity: ERROR,
			},
		],
		// https://stylelint.io/user-guide/rules/named-grid-areas-no-invalid
		"named-grid-areas-no-invalid": [
			true,
			{
				severity: ERROR,
			},
		],
		// https://stylelint.io/user-guide/rules/no-invalid-double-slash-comments
		"no-invalid-double-slash-comments": [
			true,
			{
				severity: ERROR,
			},
		],
		// https://stylelint.io/user-guide/rules/no-invalid-position-at-import-rule
		"no-invalid-position-at-import-rule": [
			true,
			{
				severity: ERROR,
			},
		],
		// https://stylelint.io/user-guide/rules/string-no-newline
		"string-no-newline": [
			true,
			{
				severity: ERROR,
			},
		],
		// https://stylelint.io/user-guide/rules/syntax-string-no-invalid
		"syntax-string-no-invalid": [
			true,
			{
				severity: ERROR,
			},
		],

		// Irregular.

		// https://stylelint.io/user-guide/rules/no-irregular-whitespace
		"no-irregular-whitespace": [
			true,
			{
				severity: ERROR,
			},
		],

		// Missing.

		// https://stylelint.io/user-guide/rules/custom-property-no-missing-var-function
		"custom-property-no-missing-var-function": [
			true,
			{
				severity: ERROR,
			},
		],
		// https://stylelint.io/user-guide/rules/font-family-no-missing-generic-family-keyword
		"font-family-no-missing-generic-family-keyword": [
			true,
			{
				severity: ERROR,
			},
		],

		// Non-standard.

		// https://stylelint.io/user-guide/rules/function-linear-gradient-no-nonstandard-direction
		"function-linear-gradient-no-nonstandard-direction": [
			true,
			{
				severity: ERROR,
			},
		],

		// Overrides.

		// https://stylelint.io/user-guide/rules/declaration-block-no-shorthand-property-overrides
		"declaration-block-no-shorthand-property-overrides": [
			true,
			{
				severity: ERROR,
			},
		],

		// Unmatchable.

		// https://stylelint.io/user-guide/rules/selector-anb-no-unmatchable
		"selector-anb-no-unmatchable": [
			true,
			{
				severity: ERROR,
			},
		],

		// Unknown.

		// https://stylelint.io/user-guide/rules/annotation-no-unknown
		"annotation-no-unknown": [
			true,
			{
				severity: ERROR,
			},
		],
		// https://stylelint.io/user-guide/rules/at-rule-descriptor-no-unknown
		"at-rule-descriptor-no-unknown": [
			true,
			{
				severity: ERROR,
			},
		],
		// https://stylelint.io/user-guide/rules/at-rule-descriptor-value-no-unknown
		"at-rule-descriptor-value-no-unknown": [
			true,
			{
				severity: ERROR,
			},
		],
		// https://stylelint.io/user-guide/rules/at-rule-no-unknown
		"at-rule-no-unknown": [
			true,
			{
				severity: ERROR,
				// Inspired by: https://github.com/pascalduez/stylelint-config-css-modules/blob/main/index.js
				ignoreAtRules: [
					"value",
				],
			},
		],
		// https://stylelint.io/user-guide/rules/declaration-property-value-no-unknown
		"declaration-property-value-no-unknown": [
			true,
			{
				severity: ERROR,
			},
		],
		// https://stylelint.io/user-guide/rules/function-no-unknown
		"function-no-unknown": [
			true,
			{
				severity: ERROR,
				// Inspired by: https://github.com/pascalduez/stylelint-config-css-modules/blob/main/index.js
				ignoreFunctions: [
					"global",
				],
			},
		],
		// https://stylelint.io/user-guide/rules/media-feature-name-no-unknown
		"media-feature-name-no-unknown": [
			true,
			{
				severity: ERROR,
			},
		],
		// https://stylelint.io/user-guide/rules/media-feature-name-value-no-unknown
		"media-feature-name-value-no-unknown": [
			true,
			{
				severity: ERROR,
			},
		],
		// https://stylelint.io/user-guide/rules/no-unknown-animations
		"no-unknown-animations": [
			true,
			{
				severity: ERROR,
			},
		],
		// https://stylelint.io/user-guide/rules/no-unknown-custom-media
		"no-unknown-custom-media": [
			true,
			{
				severity: ERROR,
			},
		],
		// https://stylelint.io/user-guide/rules/no-unknown-custom-properties
		// This rule is disabled because UUI and custom CSS properties from `src/index.css` are used extensively.
		"no-unknown-custom-properties": DISABLED,
		// https://stylelint.io/user-guide/rules/property-no-unknown
		"property-no-unknown": [
			true,
			{
				severity: ERROR,
				// Inspired by: https://github.com/pascalduez/stylelint-config-css-modules/blob/main/index.js
				ignoreProperties: [
					"composes",
					"compose-with",
				],
				ignoreSelectors: [
					":export",
					/^:import/u,
				],
			},
		],
		// https://stylelint.io/user-guide/rules/selector-pseudo-class-no-unknown
		"selector-pseudo-class-no-unknown": [
			true,
			{
				severity: ERROR,
				// Inspired by: https://github.com/pascalduez/stylelint-config-css-modules/blob/main/index.js
				ignorePseudoClasses: [
					"export",
					"import",
					"global",
					"local",
					"external",
				],
			},
		],
		// https://stylelint.io/user-guide/rules/selector-pseudo-element-no-unknown
		"selector-pseudo-element-no-unknown": [
			true,
			{
				severity: ERROR,
			},
		],
		// https://stylelint.io/user-guide/rules/selector-type-no-unknown
		"selector-type-no-unknown": [
			true,
			{
				severity: ERROR,
				// Inspired by: https://github.com/pascalduez/stylelint-config-css-modules/blob/main/index.js
				ignoreTypes: [
					"from",
				],
			},
		],
		// https://stylelint.io/user-guide/rules/unit-no-unknown
		"unit-no-unknown": [
			true,
			{
				severity: ERROR,
			},
		],

		// Enforce conventions.

		// Allowed, disallowed & required.

		// At-rule.

		// https://stylelint.io/user-guide/rules/at-rule-allowed-list
		// This rule is disabled because there is no need to set a specific list of values.
		"at-rule-allowed-list": DISABLED,
		// https://stylelint.io/user-guide/rules/at-rule-disallowed-list
		// This rule is disabled because there is no need to set a specific list of values.
		"at-rule-disallowed-list": DISABLED,
		// https://stylelint.io/user-guide/rules/at-rule-no-vendor-prefix
		"at-rule-no-vendor-prefix": [
			true,
			{
				severity: ERROR,
			},
		],
		// https://stylelint.io/user-guide/rules/at-rule-property-required-list
		// This rule is disabled because there is no need to set a specific list of values.
		"at-rule-property-required-list": DISABLED,

		// Color.

		// https://stylelint.io/user-guide/rules/color-hex-alpha
		"color-hex-alpha": [
			"never",
			{
				severity: "error",
				message: "Use rgb() function instead",
			},
		],
		// https://stylelint.io/user-guide/rules/color-named
		"color-named": [
			"never",
			{
				severity: ERROR,
			},
		],
		// https://stylelint.io/user-guide/rules/color-no-hex
		// This rule is disabled because it is fine to have HEX colors.
		"color-no-hex": DISABLED,

		// Comment.

		// https://stylelint.io/user-guide/rules/comment-word-disallowed-list
		// This rule is disabled because there is no need to set a specific list of values.
		"comment-word-disallowed-list": DISABLED,

		// Declaration.

		// https://stylelint.io/user-guide/rules/declaration-no-important
		/*
			This rule is disabled because sometimes it is necessary to override UI library's styles, which may have a very
			high specificity.
		*/
		"declaration-no-important": DISABLED,
		// https://stylelint.io/user-guide/rules/declaration-property-unit-allowed-list
		// This rule is disabled because there is no need to set a specific list of values.
		"declaration-property-unit-allowed-list": DISABLED,
		// https://stylelint.io/user-guide/rules/declaration-property-unit-disallowed-list
		// This rule is disabled because there is no need to set a specific list of values.
		"declaration-property-unit-disallowed-list": DISABLED,
		// https://stylelint.io/user-guide/rules/declaration-property-value-allowed-list
		// This rule is disabled because there is no need to set a specific list of values.
		"declaration-property-value-allowed-list": DISABLED,
		// https://stylelint.io/user-guide/rules/declaration-property-value-disallowed-list
		// This rule is disabled because there is no need to set a specific list of values.
		"declaration-property-value-disallowed-list": DISABLED,

		// Function.

		// https://stylelint.io/user-guide/rules/function-allowed-list
		// This rule is disabled because there is no need to set a specific list of values.
		"function-allowed-list": DISABLED,
		// https://stylelint.io/user-guide/rules/function-disallowed-list
		// This rule is disabled because there is no need to set a specific list of values.
		"function-disallowed-list": DISABLED,
		// https://stylelint.io/user-guide/rules/function-url-no-scheme-relative
		"function-url-no-scheme-relative": [
			true,
			{
				severity: ERROR,
			},
		],
		// https://stylelint.io/user-guide/rules/function-url-scheme-allowed-list
		// This rule is disabled because there is no need to set a specific list of values.
		"function-url-scheme-allowed-list": DISABLED,
		// https://stylelint.io/user-guide/rules/function-url-scheme-disallowed-list
		// This rule is disabled because there is no need to set a specific list of values.
		"function-url-scheme-disallowed-list": DISABLED,

		// Length.

		// https://stylelint.io/user-guide/rules/length-zero-no-unit
		"length-zero-no-unit": [
			true,
			{
				severity: ERROR,
				ignore: [
					/*
						In some cases, units SHOULD be provided. For example, when the value is used in `calc` function. For now,
						only CSS variables are allowed to have the units to not break the calculations.
					*/
					"custom-properties",
				],
			},
		],

		// Media feature.

		// https://stylelint.io/user-guide/rules/media-feature-name-allowed-list
		// This rule is disabled because there is no need to set a specific list of values.
		"media-feature-name-allowed-list": DISABLED,
		// https://stylelint.io/user-guide/rules/media-feature-name-disallowed-list
		// This rule is disabled because there is no need to set a specific list of values.
		"media-feature-name-disallowed-list": DISABLED,
		// https://stylelint.io/user-guide/rules/media-feature-name-no-vendor-prefix
		"media-feature-name-no-vendor-prefix": [
			true,
			{
				severity: ERROR,
			},
		],
		// https://stylelint.io/user-guide/rules/media-feature-name-unit-allowed-list
		// This rule is disabled because there is no need to set a specific list of values.
		"media-feature-name-unit-allowed-list": DISABLED,
		// https://stylelint.io/user-guide/rules/media-feature-name-value-allowed-list
		// This rule is disabled because there is no need to set a specific list of values.
		"media-feature-name-value-allowed-list": DISABLED,

		// Property.

		// https://stylelint.io/user-guide/rules/property-allowed-list
		// This rule is disabled because there is no need to set a specific list of values.
		"property-allowed-list": DISABLED,
		// https://stylelint.io/user-guide/rules/property-disallowed-list
		// This rule is disabled because there is no need to set a specific list of values.
		"property-disallowed-list": DISABLED,
		// https://stylelint.io/user-guide/rules/property-no-vendor-prefix
		"property-no-vendor-prefix": [
			true,
			{
				severity: ERROR,
			},
		],

		// Rule.

		// https://stylelint.io/user-guide/rules/rule-selector-property-disallowed-list
		// This rule is disabled because there is no need to set a specific list of values.
		"rule-selector-property-disallowed-list": DISABLED,

		// Selector.

		// https://stylelint.io/user-guide/rules/selector-attribute-name-disallowed-list
		// This rule is disabled because there is no need to set a specific list of values.
		"selector-attribute-name-disallowed-list": DISABLED,
		// https://stylelint.io/user-guide/rules/selector-attribute-operator-allowed-list
		// This rule is disabled because there is no need to set a specific list of values.
		"selector-attribute-operator-allowed-list": DISABLED,
		// https://stylelint.io/user-guide/rules/selector-attribute-operator-disallowed-list
		// This rule is disabled because there is no need to set a specific list of values.
		"selector-attribute-operator-disallowed-list": DISABLED,
		// https://stylelint.io/user-guide/rules/selector-combinator-allowed-list
		// This rule is disabled because there is no need to set a specific list of values.
		"selector-combinator-allowed-list": DISABLED,
		// https://stylelint.io/user-guide/rules/selector-combinator-disallowed-list
		// This rule is disabled because there is no need to set a specific list of values.
		"selector-combinator-disallowed-list": DISABLED,
		// https://stylelint.io/user-guide/rules/selector-disallowed-list
		// This rule is disabled because there is no need to set a specific list of values.
		"selector-disallowed-list": DISABLED,
		// https://stylelint.io/user-guide/rules/selector-no-qualifying-type
		"selector-no-qualifying-type": [
			true,
			{
				severity: ERROR,
				ignore: [
					"attribute",
				],
			},
		],
		// https://stylelint.io/user-guide/rules/selector-no-vendor-prefix
		"selector-no-vendor-prefix": [
			true,
			{
				severity: ERROR,
			},
		],
		// https://stylelint.io/user-guide/rules/selector-pseudo-class-allowed-list
		// This rule is disabled because there is no need to set a specific list of values.
		"selector-pseudo-class-allowed-list": DISABLED,
		// https://stylelint.io/user-guide/rules/selector-pseudo-class-disallowed-list
		// This rule is disabled because there is no need to set a specific list of values.
		"selector-pseudo-class-disallowed-list": DISABLED,
		// https://stylelint.io/user-guide/rules/selector-pseudo-element-allowed-list
		// This rule is disabled because there is no need to set a specific list of values.
		"selector-pseudo-element-allowed-list": DISABLED,
		// https://stylelint.io/user-guide/rules/selector-pseudo-element-disallowed-list
		// This rule is disabled because there is no need to set a specific list of values.
		"selector-pseudo-element-disallowed-list": DISABLED,

		// Unit.

		// https://stylelint.io/user-guide/rules/unit-allowed-list
		// This rule is disabled because there is no need to set a specific list of values.
		"unit-allowed-list": DISABLED,
		// https://stylelint.io/user-guide/rules/unit-disallowed-list
		// This rule is disabled because there is no need to set a specific list of values.
		"unit-disallowed-list": DISABLED,

		// Value.

		// https://stylelint.io/user-guide/rules/value-no-vendor-prefix
		"value-no-vendor-prefix": [
			true,
			{
				severity: ERROR,
			},
		],

		// Case.

		// https://stylelint.io/user-guide/rules/function-name-case
		"function-name-case": [
			"lower",
			{
				severity: ERROR,
			},
		],
		// https://stylelint.io/user-guide/rules/selector-type-case
		"selector-type-case": [
			"lower",
			{
				severity: ERROR,
			},
		],
		// https://stylelint.io/user-guide/rules/value-keyword-case
		"value-keyword-case": [
			"lower",
			{
				severity: ERROR,
				ignoreKeywords: [
					"Arial",
				],
			},
		],

		// Empty lines.

		// https://stylelint.io/user-guide/rules/at-rule-empty-line-before
		"at-rule-empty-line-before": [
			"always",
			{
				severity: ERROR,
				except: [
					"blockless-after-same-name-blockless",
				],
				ignore: [
					"after-comment",
				],
			},
		],
		// https://stylelint.io/user-guide/rules/comment-empty-line-before
		"comment-empty-line-before": [
			"always",
			{
				severity: ERROR,
				except: [
					"first-nested",
				],
				ignore: [
					"stylelint-commands",
				],
			},
		],
		// https://stylelint.io/user-guide/rules/custom-property-empty-line-before
		"custom-property-empty-line-before": [
			"always",
			{
				severity: ERROR,
				except: [
					"after-custom-property",
					"first-nested",
				],
				ignore: [
					"after-comment",
				],
			},
		],
		// https://stylelint.io/user-guide/rules/declaration-empty-line-before
		"declaration-empty-line-before": [
			"always",
			{
				severity: ERROR,
				except: [
					"after-declaration",
					"first-nested",
				],
				ignore: [
					"after-comment",
				],
			},
		],
		// https://stylelint.io/user-guide/rules/rule-empty-line-before
		"rule-empty-line-before": [
			"always-multi-line",
			{
				severity: ERROR,
				except: [
					"first-nested",
				],
				ignore: [
					"after-comment",
				],
			},
		],

		// Max & min.

		// https://stylelint.io/user-guide/rules/declaration-block-single-line-max-declarations
		"declaration-block-single-line-max-declarations": [
			1,
			{
				severity: ERROR,
			},
		],
		// https://stylelint.io/user-guide/rules/declaration-property-max-values
		// This rule is disabled because there is no need to limit amount of values.
		"declaration-property-max-values": DISABLED,
		// https://stylelint.io/user-guide/rules/max-nesting-depth
		"max-nesting-depth": [
			/*
				Nesting would make reading the code harder
				and seems unnecessary at this point.
			*/
			1,
			{
				severity: ERROR,
			},
		],
		// https://stylelint.io/user-guide/rules/number-max-precision
		"number-max-precision": [
			2,
			{
				severity: ERROR,
			},
		],
		// https://stylelint.io/user-guide/rules/selector-max-attribute
		// This rule is disabled because there is no need to limit amount of attribute selectors.
		"selector-max-attribute": DISABLED,
		// https://stylelint.io/user-guide/rules/selector-max-class
		// This rule is disabled because there is no need to limit amount of class selectors.
		"selector-max-class": DISABLED,
		// https://stylelint.io/user-guide/rules/selector-max-combinators
		// This rule is disabled because there is no need to limit amount of combinators.
		"selector-max-combinators": DISABLED,
		// https://stylelint.io/user-guide/rules/selector-max-compound-selectors
		// This rule is disabled because there is no need to limit amount of compound selectors.
		"selector-max-compound-selectors": DISABLED,
		// https://stylelint.io/user-guide/rules/selector-max-id
		"selector-max-id": [
			/*
				We don't need to use global selectors like this.
				Use classes, attributes or anything else instead.
			*/
			0,
			{
				severity: ERROR,
			},
		],
		// https://stylelint.io/user-guide/rules/selector-max-pseudo-class
		// This rule is disabled because there is no need to limit amount of pseudo-classes.
		"selector-max-pseudo-class": DISABLED,
		// https://stylelint.io/user-guide/rules/selector-max-specificity
		// This rule is disabled because there is no need to limit specificity.
		"selector-max-specificity": DISABLED,
		// https://stylelint.io/user-guide/rules/selector-max-type
		// This rule is disabled because there is no need to limit amount of type selectors.
		"selector-max-type": DISABLED,
		// https://stylelint.io/user-guide/rules/selector-max-universal
		// This rule is disabled because there is no need to limit amount of universal selectors.
		"selector-max-universal": DISABLED,
		// https://stylelint.io/user-guide/rules/time-min-milliseconds
		// This rule is disabled because there is no need to limit time values.
		"time-min-milliseconds": DISABLED,

		// Notation.

		// https://stylelint.io/user-guide/rules/alpha-value-notation
		"alpha-value-notation": [
			"number",
			{
				severity: ERROR,
			},
		],
		// https://stylelint.io/user-guide/rules/color-function-alias-notation
		"color-function-alias-notation": [
			"without-alpha",
			{
				severity: ERROR,
			},
		],
		// https://stylelint.io/user-guide/rules/color-function-notation
		"color-function-notation": [
			"modern",
			{
				severity: ERROR,
			},
		],
		// https://stylelint.io/user-guide/rules/color-hex-length
		"color-hex-length": [
			"short",
			{
				severity: ERROR,
			},
		],
		// https://stylelint.io/user-guide/rules/font-weight-notation
		"font-weight-notation": [
			"numeric",
			{
				severity: ERROR,
			},
		],
		// https://stylelint.io/user-guide/rules/hue-degree-notation
		"hue-degree-notation": [
			"angle",
			{
				severity: ERROR,
			},
		],
		// https://stylelint.io/user-guide/rules/import-notation
		"import-notation": [
			"url",
			{
				severity: ERROR,
			},
		],
		// https://stylelint.io/user-guide/rules/keyframe-selector-notation
		"keyframe-selector-notation": [
			"percentage",
			{
				severity: ERROR,
			},
		],
		// https://stylelint.io/user-guide/rules/lightness-notation
		"lightness-notation": [
			"percentage",
			{
				severity: ERROR,
			},
		],
		// https://stylelint.io/user-guide/rules/media-feature-range-notation
		"media-feature-range-notation": [
			"context",
			{
				severity: ERROR,
			},
		],
		// https://stylelint.io/user-guide/rules/selector-not-notation
		"selector-not-notation": [
			"complex",
			{
				severity: ERROR,
			},
		],
		// https://stylelint.io/user-guide/rules/selector-pseudo-element-colon-notation
		"selector-pseudo-element-colon-notation": [
			"double",
			{
				severity: ERROR,
			},
		],

		// Pattern.

		// https://stylelint.io/user-guide/rules/comment-pattern
		// This rule is disabled because there is no need to set any pattern.
		"comment-pattern": DISABLED,
		// https://stylelint.io/user-guide/rules/container-name-pattern
		"container-name-pattern": [
			`^${KEBAB_CASE_REGEXP_STRING}$`,
			{
				severity: ERROR,
				/** @type {RuleMessage} */
				message: (name) => {
					return `Expected container name "${name}" to be kebab-case`;
				},
			},
		],
		// https://stylelint.io/user-guide/rules/custom-media-pattern
		"custom-media-pattern": [
			`^${KEBAB_CASE_REGEXP_STRING}$`,
			{
				severity: ERROR,
				/** @type {RuleMessage} */
				message: (name) => {
					return `Expected custom media query name "${name}" to be kebab-case`;
				},
			},
		],
		// https://stylelint.io/user-guide/rules/custom-property-pattern
		"custom-property-pattern": [
			`^${KEBAB_CASE_REGEXP_STRING}$`,
			{
				severity: ERROR,
				/** @type {RuleMessage} */
				message: (name) => {
					return `Expected custom property name "${name}" to be kebab-case`;
				},
			},
		],
		// https://stylelint.io/user-guide/rules/keyframes-name-pattern
		"keyframes-name-pattern": [
			`^${KEBAB_CASE_REGEXP_STRING}$`,
			{
				severity: ERROR,
				/** @type {RuleMessage} */
				message: (name) => {
					return `Expected keyframe name "${name}" to be kebab-case`;
				},
			},
		],
		"layer-name-pattern": [
			`^${KEBAB_CASE_REGEXP_STRING}$`,
			{
				severity: ERROR,
				/** @type {RuleMessage} */
				message: (name) => {
					return `Expected layer name "${name}" to be kebab-case`;
				},
			},
		],
		// https://stylelint.io/user-guide/rules/selector-class-pattern
		"selector-class-pattern": [
			/*
				Custom classes should be camelCase-ed.
				UUI library global classes have prefix `uui` and are kebab-case-ed.
			*/
			`^(?!uui)${CAMEL_CASE_REGEXP_STRING}$|^uui-${KEBAB_CASE_REGEXP_STRING}$`,
			{
				severity: ERROR,
				/** @type {RuleMessage} */
				message: (selector) => {
					if (!isString(selector)) {
						return "Selector is not a string";
					}

					const trimmedSelector = selector.trim();

					if (trimmedSelector.startsWith(".uui")) {
						return `Expected class selector "${trimmedSelector}" to be kebab-case`;
					}

					return `Expected class selector "${trimmedSelector}" to be camelCase`;
				},
			},
		],
		// https://stylelint.io/user-guide/rules/selector-id-pattern
		// This rule is disabled because id selectors are prohibited (see the "selector-max-id" rule).
		"selector-id-pattern": DISABLED,
		// https://stylelint.io/user-guide/rules/selector-nested-pattern
		/*
			This rule is disabled because maximum nesting depth is set to 1 (see the "max-nesting-depth" rule), which means no
			nesting is expected.
		*/
		"selector-nested-pattern": DISABLED,

		// Quotes.

		// https://stylelint.io/user-guide/rules/font-family-name-quotes
		"font-family-name-quotes": [
			"always-where-recommended",
			{
				severity: ERROR,
			},
		],
		// https://stylelint.io/user-guide/rules/function-url-quotes
		"function-url-quotes": [
			"always",
			{
				severity: ERROR,
			},
		],
		// https://stylelint.io/user-guide/rules/selector-attribute-quotes
		"selector-attribute-quotes": [
			"always",
			{
				severity: ERROR,
			},
		],

		// Redundant.

		// https://stylelint.io/user-guide/rules/declaration-block-no-redundant-longhand-properties
		"declaration-block-no-redundant-longhand-properties": [
			true,
			{
				severity: ERROR,
			},
		],
		// https://stylelint.io/user-guide/rules/shorthand-property-no-redundant-values
		"shorthand-property-no-redundant-values": [
			true,
			{
				severity: ERROR,
			},
		],

		// Whitespace inside.

		// https://stylelint.io/user-guide/rules/comment-whitespace-inside
		"comment-whitespace-inside": [
			"always",
			{
				severity: ERROR,
			},
		],

		/*
			==================================================
			Order plugin
			==================================================
		*/

		// https://github.com/hudochenkov/stylelint-order/blob/master/rules/order/README.md
		"order/order": [
			[
				"custom-properties",
				"declarations",
				"at-rules",
				"rules",
			],
			{
				severity: ERROR,
				unspecified: "ignore",
			},
		],
		// https://github.com/hudochenkov/stylelint-order/blob/master/rules/properties-order/README.md
		// This rule is disabled because there is no need to sort properties within groups.
		"order/properties-order": DISABLED,
		// https://github.com/hudochenkov/stylelint-order/blob/master/rules/properties-alphabetical-order/README.md
		"order/properties-alphabetical-order": [
			true,
			{
				severity: ERROR,
			},
		],

		/*
			==================================================
			Stylistic plugin
			==================================================
		*/

		// Color.

		// https://github.com/stylelint-stylistic/stylelint-stylistic/blob/main/lib/rules/color-hex-case/README.md
		"@stylistic/color-hex-case": [
			"lower",
			{
				severity: ERROR,
			},
		],

		// Function.

		// https://github.com/stylelint-stylistic/stylelint-stylistic/blob/main/lib/rules/function-comma-newline-after/README.md
		"@stylistic/function-comma-newline-after": [
			"always-multi-line",
			{
				severity: ERROR,
			},
		],
		// https://github.com/stylelint-stylistic/stylelint-stylistic/blob/main/lib/rules/function-comma-newline-before/README.md
		"@stylistic/function-comma-newline-before": [
			"never-multi-line",
			{
				severity: ERROR,
			},
		],
		// https://github.com/stylelint-stylistic/stylelint-stylistic/blob/main/lib/rules/function-comma-space-after/README.md
		"@stylistic/function-comma-space-after": [
			"always-single-line",
			{
				severity: ERROR,
			},
		],
		// https://github.com/stylelint-stylistic/stylelint-stylistic/blob/main/lib/rules/function-comma-space-before/README.md
		"@stylistic/function-comma-space-before": [
			"never",
			{
				severity: ERROR,
			},
		],
		// https://github.com/stylelint-stylistic/stylelint-stylistic/blob/main/lib/rules/function-max-empty-lines/README.md
		"@stylistic/function-max-empty-lines": [
			0,
			{
				severity: ERROR,
			},
		],
		// https://github.com/stylelint-stylistic/stylelint-stylistic/blob/main/lib/rules/function-parentheses-newline-inside/README.md
		"@stylistic/function-parentheses-newline-inside": [
			"always-multi-line",
			{
				severity: ERROR,
			},
		],
		// https://github.com/stylelint-stylistic/stylelint-stylistic/blob/main/lib/rules/function-parentheses-space-inside/README.md
		"@stylistic/function-parentheses-space-inside": [
			"never-single-line",
			{
				severity: ERROR,
			},
		],
		// https://github.com/stylelint-stylistic/stylelint-stylistic/blob/main/lib/rules/function-whitespace-after/README.md
		"@stylistic/function-whitespace-after": [
			"always",
			{
				severity: ERROR,
			},
		],

		// Number.

		// https://github.com/stylelint-stylistic/stylelint-stylistic/blob/main/lib/rules/number-leading-zero/README.md
		"@stylistic/number-leading-zero": [
			"always",
			{
				severity: ERROR,
			},
		],
		// https://github.com/stylelint-stylistic/stylelint-stylistic/blob/main/lib/rules/number-no-trailing-zeros/README.md
		"@stylistic/number-no-trailing-zeros": [
			true,
			{
				severity: ERROR,
			},
		],

		// String.

		// https://github.com/stylelint-stylistic/stylelint-stylistic/blob/main/lib/rules/string-quotes/README.md
		"@stylistic/string-quotes": [
			"double",
			{
				severity: ERROR,
			},
		],

		// Unit.

		// https://github.com/stylelint-stylistic/stylelint-stylistic/blob/main/lib/rules/unit-case/README.md
		"@stylistic/unit-case": [
			"lower",
			{
				severity: ERROR,
			},
		],

		// Value list.

		// https://github.com/stylelint-stylistic/stylelint-stylistic/blob/main/lib/rules/value-list-comma-newline-after/README.md
		"@stylistic/value-list-comma-newline-after": [
			"always-multi-line",
			{
				severity: ERROR,
			},
		],
		// https://github.com/stylelint-stylistic/stylelint-stylistic/blob/main/lib/rules/value-list-comma-newline-before/README.md
		"@stylistic/value-list-comma-newline-before": [
			"never-multi-line",
			{
				severity: ERROR,
			},
		],
		// https://github.com/stylelint-stylistic/stylelint-stylistic/blob/main/lib/rules/value-list-comma-space-after/README.md
		"@stylistic/value-list-comma-space-after": [
			"always-single-line",
			{
				severity: ERROR,
			},
		],
		// https://github.com/stylelint-stylistic/stylelint-stylistic/blob/main/lib/rules/value-list-comma-space-before/README.md
		"@stylistic/value-list-comma-space-before": [
			"never",
			{
				severity: ERROR,
			},
		],
		// https://github.com/stylelint-stylistic/stylelint-stylistic/blob/main/lib/rules/value-list-max-empty-lines/README.md
		"@stylistic/value-list-max-empty-lines": [
			0,
			{
				severity: ERROR,
			},
		],

		// Property.

		// https://github.com/stylelint-stylistic/stylelint-stylistic/blob/main/lib/rules/property-case/README.md
		"@stylistic/property-case": [
			"lower",
			{
				severity: ERROR,
			},
		],

		// Declaration.

		// https://github.com/stylelint-stylistic/stylelint-stylistic/blob/main/lib/rules/declaration-bang-space-after/README.md
		"@stylistic/declaration-bang-space-after": [
			"never",
			{
				severity: ERROR,
			},
		],
		// https://github.com/stylelint-stylistic/stylelint-stylistic/blob/main/lib/rules/declaration-bang-space-before/README.md
		"@stylistic/declaration-bang-space-before": [
			"always",
			{
				severity: ERROR,
			},
		],
		// https://github.com/stylelint-stylistic/stylelint-stylistic/blob/main/lib/rules/declaration-colon-newline-after/README.md
		/*
			This rule is disabled because it is unnecessary to add any rules here.
			If the value takes multiple lines, use parentheses to wrap them, and use
			new lines, so that it looks the same as in the JavaScript/TypeScript code.

			For example:
			```css
			box-shadow: (
				0 0 0 1px #5b9dd9,
				0 0 2px 1px rgb(30, 140, 190, 0.8)
			);
			```
		*/
		"@stylistic/declaration-colon-newline-after": DISABLED,
		// https://github.com/stylelint-stylistic/stylelint-stylistic/blob/main/lib/rules/declaration-colon-space-after/README.md
		"@stylistic/declaration-colon-space-after": [
			"always",
			{
				severity: ERROR,
			},
		],
		// https://github.com/stylelint-stylistic/stylelint-stylistic/blob/main/lib/rules/declaration-colon-space-before/README.md
		"@stylistic/declaration-colon-space-before": [
			"never",
			{
				severity: ERROR,
			},
		],

		// Declaration block.

		// https://github.com/stylelint-stylistic/stylelint-stylistic/blob/main/lib/rules/declaration-block-semicolon-newline-after/README.md
		"@stylistic/declaration-block-semicolon-newline-after": [
			"always",
			{
				severity: ERROR,
			},
		],
		// https://github.com/stylelint-stylistic/stylelint-stylistic/blob/main/lib/rules/declaration-block-semicolon-newline-before/README.md
		"@stylistic/declaration-block-semicolon-newline-before": [
			"never-multi-line",
			{
				severity: ERROR,
			},
		],
		// https://github.com/stylelint-stylistic/stylelint-stylistic/blob/main/lib/rules/declaration-block-semicolon-space-after/README.md
		"@stylistic/declaration-block-semicolon-space-after": [
			"always-single-line",
			{
				severity: ERROR,
			},
		],
		// https://github.com/stylelint-stylistic/stylelint-stylistic/blob/main/lib/rules/declaration-block-semicolon-space-before/README.md
		"@stylistic/declaration-block-semicolon-space-before": [
			"never",
			{
				severity: ERROR,
			},
		],
		// https://github.com/stylelint-stylistic/stylelint-stylistic/blob/main/lib/rules/declaration-block-trailing-semicolon/README.md
		"@stylistic/declaration-block-trailing-semicolon": [
			"always",
			{
				severity: ERROR,
			},
		],

		// Block.

		// https://github.com/stylelint-stylistic/stylelint-stylistic/blob/main/lib/rules/block-closing-brace-empty-line-before/README.md
		"@stylistic/block-closing-brace-empty-line-before": [
			"never",
			{
				severity: ERROR,
			},
		],
		// https://github.com/stylelint-stylistic/stylelint-stylistic/blob/main/lib/rules/block-closing-brace-newline-after/README.md
		"@stylistic/block-closing-brace-newline-after": [
			"always",
			{
				severity: ERROR,
			},
		],
		// https://github.com/stylelint-stylistic/stylelint-stylistic/blob/main/lib/rules/block-closing-brace-newline-before/README.md
		"@stylistic/block-closing-brace-newline-before": [
			"always",
			{
				severity: ERROR,
			},
		],
		// https://github.com/stylelint-stylistic/stylelint-stylistic/blob/main/lib/rules/block-closing-brace-space-after/README.md
		/*
			This rule is disabled because the "block-closing-brace-newline-after" rule requires new lines after the closing
			brace, and it is unnecessary to add spaces after it too.
		*/
		"@stylistic/block-closing-brace-space-after": DISABLED,
		// https://github.com/stylelint-stylistic/stylelint-stylistic/blob/main/lib/rules/block-closing-brace-space-before/README.md
		/*
			This rule is disabled because the "block-closing-brace-newline-before" rule requires new lines before the closing
			brace, and it is unnecessary to add spaces before it too.
		*/
		"@stylistic/block-closing-brace-space-before": DISABLED,
		// https://github.com/stylelint-stylistic/stylelint-stylistic/blob/main/lib/rules/block-opening-brace-newline-after/README.md
		"@stylistic/block-opening-brace-newline-after": [
			"always",
			{
				severity: ERROR,
			},
		],
		// https://github.com/stylelint-stylistic/stylelint-stylistic/blob/main/lib/rules/block-opening-brace-newline-before/README.md
		// This rule is disabled because the "block-opening-brace-space-before" rule handles it.
		"@stylistic/block-opening-brace-newline-before": DISABLED,
		// https://github.com/stylelint-stylistic/stylelint-stylistic/blob/main/lib/rules/block-opening-brace-space-after/README.md
		"@stylistic/block-opening-brace-space-after": [
			"always-single-line",
			{
				severity: ERROR,
			},
		],
		// https://github.com/stylelint-stylistic/stylelint-stylistic/blob/main/lib/rules/block-opening-brace-space-before/README.md
		"@stylistic/block-opening-brace-space-before": [
			"always",
			{
				severity: ERROR,
			},
		],

		// Selector.

		// https://github.com/stylelint-stylistic/stylelint-stylistic/blob/main/lib/rules/selector-attribute-brackets-space-inside/README.md
		"@stylistic/selector-attribute-brackets-space-inside": [
			"never",
			{
				severity: ERROR,
			},
		],
		// https://github.com/stylelint-stylistic/stylelint-stylistic/blob/main/lib/rules/selector-attribute-operator-space-after/README.md
		"@stylistic/selector-attribute-operator-space-after": [
			"never",
			{
				severity: ERROR,
			},
		],
		// https://github.com/stylelint-stylistic/stylelint-stylistic/blob/main/lib/rules/selector-attribute-operator-space-before/README.md
		"@stylistic/selector-attribute-operator-space-before": [
			"never",
			{
				severity: ERROR,
			},
		],
		// https://github.com/stylelint-stylistic/stylelint-stylistic/blob/main/lib/rules/selector-combinator-space-after/README.md
		"@stylistic/selector-combinator-space-after": [
			"always",
			{
				severity: ERROR,
			},
		],
		// https://github.com/stylelint-stylistic/stylelint-stylistic/blob/main/lib/rules/selector-combinator-space-before/README.md
		"@stylistic/selector-combinator-space-before": [
			"always",
			{
				severity: ERROR,
			},
		],
		// https://github.com/stylelint-stylistic/stylelint-stylistic/blob/main/lib/rules/selector-descendant-combinator-no-non-space/README.md
		"@stylistic/selector-descendant-combinator-no-non-space": [
			true,
			{
				severity: ERROR,
			},
		],
		// https://github.com/stylelint-stylistic/stylelint-stylistic/blob/main/lib/rules/selector-max-empty-lines/README.md
		"@stylistic/selector-max-empty-lines": [
			0,
			{
				severity: ERROR,
			},
		],
		// https://github.com/stylelint-stylistic/stylelint-stylistic/blob/main/lib/rules/selector-pseudo-class-case/README.md
		"@stylistic/selector-pseudo-class-case": [
			"lower",
			{
				severity: ERROR,
			},
		],
		// https://github.com/stylelint-stylistic/stylelint-stylistic/blob/main/lib/rules/selector-pseudo-class-parentheses-space-inside/README.md
		"@stylistic/selector-pseudo-class-parentheses-space-inside": [
			"never",
			{
				severity: ERROR,
			},
		],
		// https://github.com/stylelint-stylistic/stylelint-stylistic/blob/main/lib/rules/selector-pseudo-element-case/README.md
		"@stylistic/selector-pseudo-element-case": [
			"lower",
			{
				severity: ERROR,
			},
		],

		// Selector list.

		// https://github.com/stylelint-stylistic/stylelint-stylistic/blob/main/lib/rules/selector-list-comma-newline-after/README.md
		"@stylistic/selector-list-comma-newline-after": [
			"always",
			{
				severity: ERROR,
			},
		],
		// https://github.com/stylelint-stylistic/stylelint-stylistic/blob/main/lib/rules/selector-list-comma-newline-before/README.md
		"@stylistic/selector-list-comma-newline-before": [
			"never-multi-line",
			{
				severity: ERROR,
			},
		],
		// https://github.com/stylelint-stylistic/stylelint-stylistic/blob/main/lib/rules/selector-list-comma-space-after/README.md
		"@stylistic/selector-list-comma-space-after": [
			"always-single-line",
			{
				severity: ERROR,
			},
		],
		// https://github.com/stylelint-stylistic/stylelint-stylistic/blob/main/lib/rules/selector-list-comma-space-before/README.md
		"@stylistic/selector-list-comma-space-before": [
			"never",
			{
				severity: ERROR,
			},
		],

		// Media feature.

		// https://github.com/stylelint-stylistic/stylelint-stylistic/blob/main/lib/rules/media-feature-colon-space-after/README.md
		"@stylistic/media-feature-colon-space-after": [
			"always",
			{
				severity: ERROR,
			},
		],
		// https://github.com/stylelint-stylistic/stylelint-stylistic/blob/main/lib/rules/media-feature-colon-space-before/README.md
		"@stylistic/media-feature-colon-space-before": [
			"never",
			{
				severity: ERROR,
			},
		],
		// https://github.com/stylelint-stylistic/stylelint-stylistic/blob/main/lib/rules/media-feature-name-case/README.md
		"@stylistic/media-feature-name-case": [
			"lower",
			{
				severity: ERROR,
			},
		],
		// https://github.com/stylelint-stylistic/stylelint-stylistic/blob/main/lib/rules/media-feature-parentheses-space-inside/README.md
		"@stylistic/media-feature-parentheses-space-inside": [
			"never",
			{
				severity: ERROR,
			},
		],
		// https://github.com/stylelint-stylistic/stylelint-stylistic/blob/main/lib/rules/media-feature-range-operator-space-after/README.md
		"@stylistic/media-feature-range-operator-space-after": [
			"always",
			{
				severity: ERROR,
			},
		],
		// https://github.com/stylelint-stylistic/stylelint-stylistic/blob/main/lib/rules/media-feature-range-operator-space-before/README.md
		"@stylistic/media-feature-range-operator-space-before": [
			"always",
			{
				severity: ERROR,
			},
		],

		// Media query list.

		// https://github.com/stylelint-stylistic/stylelint-stylistic/blob/main/lib/rules/media-query-list-comma-newline-after/README.md
		"@stylistic/media-query-list-comma-newline-after": [
			"always",
			{
				severity: ERROR,
			},
		],
		// https://github.com/stylelint-stylistic/stylelint-stylistic/blob/main/lib/rules/media-query-list-comma-newline-before/README.md
		"@stylistic/media-query-list-comma-newline-before": [
			"never-multi-line",
			{
				severity: ERROR,
			},
		],
		// https://github.com/stylelint-stylistic/stylelint-stylistic/blob/main/lib/rules/media-query-list-comma-space-after/README.md
		"@stylistic/media-query-list-comma-space-after": [
			"always-single-line",
			{
				severity: ERROR,
			},
		],
		// https://github.com/stylelint-stylistic/stylelint-stylistic/blob/main/lib/rules/media-query-list-comma-space-before/README.md
		"@stylistic/media-query-list-comma-space-before": [
			"never",
			{
				severity: ERROR,
			},
		],

		// At-rule.

		// https://github.com/stylelint-stylistic/stylelint-stylistic/blob/main/lib/rules/at-rule-name-case/README.md
		"@stylistic/at-rule-name-case": [
			"lower",
			{
				severity: ERROR,
			},
		],
		// https://github.com/stylelint-stylistic/stylelint-stylistic/blob/main/lib/rules/at-rule-name-newline-after/README.md
		// This rule is disabled because it is unnecessary.
		"@stylistic/at-rule-name-newline-after": DISABLED,
		// https://github.com/stylelint-stylistic/stylelint-stylistic/blob/main/lib/rules/at-rule-name-space-after/README.md
		"@stylistic/at-rule-name-space-after": [
			"always",
			{
				severity: ERROR,
			},
		],
		// https://github.com/stylelint-stylistic/stylelint-stylistic/blob/main/lib/rules/at-rule-semicolon-newline-after/README.md
		"@stylistic/at-rule-semicolon-newline-after": [
			"always",
			{
				severity: ERROR,
			},
		],
		// https://github.com/stylelint-stylistic/stylelint-stylistic/blob/main/lib/rules/at-rule-semicolon-space-before/README.md
		"@stylistic/at-rule-semicolon-space-before": [
			"never",
			{
				severity: ERROR,
			},
		],

		// Named grid areas.

		// https://github.com/stylelint-stylistic/stylelint-stylistic/blob/main/lib/rules/named-grid-areas-alignment/README.md
		"@stylistic/named-grid-areas-alignment": [
			true,
			{
				severity: ERROR,
				gap: 1,
				alignQuotes: false,
			},
		],

		// General / Sheet.

		// https://github.com/stylelint-stylistic/stylelint-stylistic/blob/main/lib/rules/indentation/README.md
		"@stylistic/indentation": [
			"tab",
			{
				severity: ERROR,
				baseIndentLevel: 1,
				indentInsideParens: "twice",
				except: [
					"value",
				],
				indentClosingBrace: false,
			},
		],
		// https://github.com/stylelint-stylistic/stylelint-stylistic/blob/main/lib/rules/linebreaks/README.md
		// This rule is disabled because the line break style doesn't really matter.
		"@stylistic/linebreaks": DISABLED,
		// https://github.com/stylelint-stylistic/stylelint-stylistic/blob/main/lib/rules/max-empty-lines/README.md
		"@stylistic/max-empty-lines": [
			1,
			{
				severity: ERROR,
			},
		],
		// https://github.com/stylelint-stylistic/stylelint-stylistic/blob/main/lib/rules/max-line-length/README.md
		"@stylistic/max-line-length": [
			120,
			{
				severity: ERROR,
			},
		],
		// https://github.com/stylelint-stylistic/stylelint-stylistic/blob/main/lib/rules/no-empty-first-line/README.md
		"@stylistic/no-empty-first-line": [
			true,
			{
				severity: ERROR,
			},
		],
		// https://github.com/stylelint-stylistic/stylelint-stylistic/blob/main/lib/rules/no-eol-whitespace/README.md
		"@stylistic/no-eol-whitespace": [
			true,
			{
				severity: ERROR,
			},
		],
		// https://github.com/stylelint-stylistic/stylelint-stylistic/blob/main/lib/rules/no-extra-semicolons/README.md
		"@stylistic/no-extra-semicolons": [
			true,
			{
				severity: ERROR,
			},
		],
		// https://github.com/stylelint-stylistic/stylelint-stylistic/blob/main/lib/rules/no-missing-end-of-source-newline/README.md
		"@stylistic/no-missing-end-of-source-newline": [
			true,
			{
				severity: ERROR,
			},
		],
		// https://github.com/stylelint-stylistic/stylelint-stylistic/blob/main/lib/rules/unicode-bom/README.md
		"@stylistic/unicode-bom": [
			"never",
			{
				severity: ERROR,
			},
		],
	},
};

export default stylelintConfig;
