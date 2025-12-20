import type { TFlatConfigItem } from '../../../types';

const consistentRules: TFlatConfigItem['rules'] = {
	'consistent-type-definitions': ['error', 'interface'],
	'consistent-type-imports': [
		'error',
		{
			disallowTypeAnnotations: true,
			fixStyle: 'separate-type-imports',
			prefer: 'type-imports',
		},
	],
};

export { consistentRules };
