import { FILES } from '@chronoverse-toolkit/utils';
import type { TFlatConfigItem, IOptionsConfig } from '../types';
import { isNotNil } from 'es-toolkit';
import tsEslint from 'typescript-eslint';

const { tsFiles } = FILES;

type TTypeScriptSetupOptions = Pick<IOptionsConfig, 'tsProjectService' | 'tsProject' | 'tsconfigRootDir'>;

const tsSetup = async (options: TTypeScriptSetupOptions = {}): Promise<TFlatConfigItem[]> => {
	const { tsProjectService, tsProject, tsconfigRootDir } = options;

	return [
		{
			name: '@chronoverse-eslint/ts/setup',
			languageOptions: {
				parser: tsEslint.parser,
				parserOptions: {
					ecmaVersion: 'latest',
					projectService: tsProjectService,
					...(isNotNil(tsProject) && { project: tsProject }),
					...(isNotNil(tsconfigRootDir) && { tsconfigRootDir }),
					sourceType: 'module',
				},
			},
		},
		{
			name: '@chronoverse-eslint/ts/files',
			files: tsFiles,
		},
	];
};

export { tsSetup };
