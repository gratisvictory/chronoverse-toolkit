import type { TFlatConfigItem } from '../../../types';

const variablesRules: TFlatConfigItem['rules'] = {
	// Disallow deleting variables
	'no-delete-var': 'error',

	// Disallow labels that share a name with a variable
	'no-label-var': 'error',

	// Disallow specified global variables
	'no-restricted-globals': [
		'error',
		{
			name: 'isFinite',
			message: 'Use Number.isFinite instead',
		},
		{
			name: 'isNaN',
			message: 'Use Number.isNaN instead',
		},
	],

	// Disallow variable declarations from shadowing variables declared in the outer scope
	'no-shadow': 'error',

	// Disallow identifiers from shadowing restricted names
	'no-shadow-restricted-names': 'error',

	// Disallow the use of undeclared variables unless mentioned in /*global */ comments
	'no-undef': 'error',

	// Disallow initializing variables to undefined
	'no-undef-init': 'error',

	// Disallow unused variables
	'no-unused-vars': [
		'error',
		{
			vars: 'all',
			args: 'after-used',
			ignoreRestSiblings: true,
			argsIgnorePattern: '^_',
			varsIgnorePattern: '^_',
		},
	],

	// Disallow the use of variables before they are defined
	'no-use-before-define': [
		'error',
		{
			functions: false,
			classes: true,
			variables: true,
		},
	],
};

export { variablesRules };
