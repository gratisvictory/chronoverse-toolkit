import type { TFlatConfigItem } from '../../../types';

const safeRules: TFlatConfigItem['rules'] = {
	'no-type-assertion': 'error',
	'no-unsafe-object-enum-method': 'error',
	'no-unsafe-object-property-check': 'error',
	'no-unsafe-object-property-overwrite': 'error',
};

export { safeRules };
