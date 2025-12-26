import type { TFlatConfigItem } from '../../../types';

const bestPracticeRules: TFlatConfigItem['rules'] = {
	// Enforce return statements in callbacks of array methods
	'array-callback-return': ['error', { allowImplicit: true }],

	// Enforce variables to be declared in the scope they're used
	'block-scoped-var': 'error',

	// Enforce that class methods utilize 'this'
	'class-methods-use-this': 'error',

	// Enforce consistent return with or without value
	'consistent-return': 'error',

	// Enforce consistent brace style for all control statements
	curly: ['error', 'multi-line'],

	// Require default cases in switch statements
	'default-case': ['error', { commentPattern: '^no default$' }],

	// Enforce default clauses in switch statements to be last
	'default-case-last': 'error',

	// Enforce default parameters to be last
	'default-param-last': 'error',

	// Enforce dot notation whenever possible
	'dot-notation': ['error', { allowKeywords: true }],

	// Require the use of === and !==
	eqeqeq: ['error', 'always'],

	// Require grouped accessor pairs in object literals and classes
	'grouped-accessor-pairs': 'error',

	// Require for-in loops to include an if statement
	'guard-for-in': 'error',

	// Enforce a maximum number of classes per file
	'max-classes-per-file': ['error', 1],

	// Disallow the use of alert, confirm, and prompt
	'no-alert': 'error',

	// Disallow the use of arguments.caller or arguments.callee
	'no-caller': 'error',

	// Disallow lexical declarations in case clauses
	'no-case-declarations': 'error',

	// Disallow returning value in constructor
	'no-constructor-return': 'error',

	// Disallow else blocks after return statements in if statements
	'no-else-return': ['error', { allowElseIf: false }],

	// Disallow empty functions
	'no-empty-function': ['error', { allow: ['arrowFunctions', 'functions', 'methods'] }],

	// Disallow empty destructuring patterns
	'no-empty-pattern': 'error',

	// Disallow the use of eval()
	'no-eval': 'error',

	// Disallow extending native types
	'no-extend-native': 'error',

	// Disallow unnecessary calls to .bind()
	'no-extra-bind': 'error',

	// Disallow unnecessary labels
	'no-extra-label': 'error',

	// Disallow fallthrough of case statements
	'no-fallthrough': 'error',

	// Disallow reassignments of native objects or read-only global variables
	'no-global-assign': ['error', { exceptions: [] }],

	// Disallow shorthand type conversions (except !!)
	'no-implicit-coercion': ['error', { allow: ['!!'] }],

	// Disallow the use of eval()-like methods
	'no-implied-eval': 'error',

	// Disallow the use of the __iterator__ property
	'no-iterator': 'error',

	// Disallow labeled statements
	'no-labels': ['error', { allowLoop: false, allowSwitch: false }],

	// Disallow unnecessary nested blocks
	'no-lone-blocks': 'error',

	// Disallow function declarations that contain unsafe references inside loop statements
	'no-loop-func': 'error',

	// Disallow multiline strings
	'no-multi-str': 'error',

	// Disallow new operators outside of assignments or comparisons
	'no-new': 'error',

	// Disallow new operators with the Function object
	'no-new-func': 'error',

	// Disallow new operators with the String, Number, and Boolean objects
	'no-new-wrappers': 'error',

	// Disallow \8 and \9 escape sequences in string literals
	'no-nonoctal-decimal-escape': 'error',

	// Disallow octal literals
	'no-octal': 'error',

	// Disallow octal escape sequences in string literals
	'no-octal-escape': 'error',

	// Disallow reassigning function parameters
	'no-param-reassign': [
		'error',
		{
			props: true,
			ignorePropertyModificationsFor: [
				'acc',
				'accumulator',
				'e',
				'ctx',
				'context',
				'req',
				'request',
				'res',
				'response',
				'$scope',
				'staticContext',
			],
		},
	],

	// Disallow the use of the __proto__ property
	'no-proto': 'error',

	// Disallow variable redeclaration
	'no-redeclare': 'error',

	// Disallow assignment operators in return statements
	'no-return-assign': ['error', 'always'],

	// Disallow javascript: urls
	'no-script-url': 'error',

	// Disallow assignments where both sides are exactly the same
	'no-self-assign': ['error', { props: true }],

	// Disallow comparisons where both sides are exactly the same
	'no-self-compare': 'error',

	// Disallow comma operators
	'no-sequences': 'error',

	// Disallow throwing literals as exceptions
	'no-throw-literal': 'error',

	// Disallow unused expressions
	'no-unused-expressions': [
		'error',
		{
			allowShortCircuit: false,
			allowTernary: false,
			allowTaggedTemplates: false,
		},
	],

	// Disallow unused labels
	'no-unused-labels': 'error',

	// Disallow unnecessary calls to .call() and .apply()
	'no-useless-call': 'error',

	// Disallow unnecessary catch clauses
	'no-useless-catch': 'error',

	// Disallow unnecessary concatenation of literals or template literals
	'no-useless-concat': 'error',

	// Disallow unnecessary escape characters
	'no-useless-escape': 'error',

	// Disallow redundant return statements
	'no-useless-return': 'error',

	// Disallow void operators
	'no-void': 'error',

	// Disallow with statements
	'no-with': 'error',

	// Require using Error objects as Promise rejection reasons
	'prefer-promise-reject-errors': ['error', { allowEmptyReject: true }],

	// Disallow use of the RegExp constructor in favor of regular expression literals
	'prefer-regex-literals': ['error', { disallowRedundantWrapping: true }],

	// Enforce the consistent use of the radix argument when using parseInt()
	radix: 'error',

	// Require var declarations be placed at the top of their containing scope
	'vars-on-top': 'error',

	// Require "Yoda" conditions to be avoided
	yoda: 'error',
};

export { bestPracticeRules };
