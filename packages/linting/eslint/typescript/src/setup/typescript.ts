import { FILES } from '@chronoverse-toolkit/utils';
import type { TFlatConfigItem } from '../types';
import tsEslint from 'typescript-eslint';

const { tsFiles } = FILES;

const typescriptSetup = async (): Promise<TFlatConfigItem[]> => [
	{
		name: '@chronoverse-eslint/ts/setup',
		languageOptions: {
			parser: tsEslint.parser,
			parserOptions: {
				ecmaVersion: 'latest',
				projectService: true,
				sourceType: 'module',
			},
		},
	},
	{
		name: '@chronoverse-eslint/ts/files',
		files: tsFiles,
	},
];

export { typescriptSetup };
