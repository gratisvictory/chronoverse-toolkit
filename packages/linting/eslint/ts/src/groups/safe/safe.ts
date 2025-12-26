import type { IOptionsOverrides, TFlatConfigItem } from '../../types';
import { safeGroup } from './group';
import { applyRuleGroups, registerGroupsAsPlugins, FILES } from '@chronoverse-toolkit/utils';

const { tsFiles } = FILES;

const safeGroups = async ({ overrides = {} }: IOptionsOverrides): Promise<TFlatConfigItem[]> => {
	const group = safeGroup();
	const groups = [group];

	const baseRules = applyRuleGroups(groups);

	return [
		{
			name: '@chronoverse-eslint/ts/safe',
			files: tsFiles,
			plugins: registerGroupsAsPlugins(groups),
			rules: {
				...baseRules,
				...overrides,
			},
		},
	];
};

export { safeGroups };
