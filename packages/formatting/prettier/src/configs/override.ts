import type { TPrettierConfig } from '../@types';
import { FILES } from '@chronoverse-toolkit/utils';

const { jsonFiles, mdFiles } = FILES;

const TWO_SPACE_INDENT_OPTIONS = { tabWidth: 2, useTabs: false } as const;

const createDefaultOverrides = (): NonNullable<TPrettierConfig['overrides']> => [
	{
		files: jsonFiles,
		options: TWO_SPACE_INDENT_OPTIONS,
	},
	{
		files: mdFiles,
		options: TWO_SPACE_INDENT_OPTIONS,
	},
];

export { createDefaultOverrides };
