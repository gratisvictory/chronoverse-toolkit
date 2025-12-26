import { sharedGlobals, FILES } from '@chronoverse-toolkit/utils';
import type { TFlatConfigItem } from '../types';

const { jsFiles } = FILES;

const jsSetup = async (): Promise<TFlatConfigItem[]> => [
	{
		name: '@chronoverse-eslint/js/setup',
		languageOptions: {
			ecmaVersion: 'latest',
			globals: sharedGlobals,
			parserOptions: {
				ecmaFeatures: {
					jsx: true,
				},
				ecmaVersion: 'latest',
				sourceType: 'module',
			},
			sourceType: 'module',
		},
		linterOptions: {
			reportUnusedDisableDirectives: 'error',
			reportUnusedInlineConfigs: 'error',
		},
	},
	{
		name: '@chronoverse-eslint/js/files',
		files: [jsFiles],
	},
];

export { jsSetup };
