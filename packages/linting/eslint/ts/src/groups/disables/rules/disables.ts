import type { TFlatConfigItem } from '../../../types';

const disablesRules: TFlatConfigItem['rules'] = {
	'no-undef': 'off',
	'no-unused-expressions': 'off',
	'no-unused-vars': 'off',
	'no-useless-constructor': 'off',
	'no-shadow': 'off',
	'no-use-before-define': 'off',
	'require-await': 'off',
	'no-magic-numbers': 'off',
	'no-empty-function': 'off',
	camelcase: 'off',
	'no-array-constructor': 'off',
	'no-dupe-args': 'off',
	'no-dupe-keys': 'off',
	'no-unreachable': 'off',
	'valid-typeof': 'off',
	'no-const-assign': 'off',
	'no-new-symbol': 'off',
	'no-this-before-super': 'off',
	'no-redeclare': 'off',
	'no-dupe-class-members': 'off',
	strict: 'off',
	'array-callback-return': 'off',
	'getter-return': 'off',
};

export { disablesRules };
