import type { IOptionsOverrides, TFlatConfigItem } from '../../types';
import { consistentGroup } from './group';
import { applyRuleGroups, registerGroupsAsPlugins, FILES } from '@chronoverse-toolkit/utils';

const { tsFiles } = FILES;

const consistentGroups = async ({ overrides = {} }: IOptionsOverrides): Promise<TFlatConfigItem[]> => {
	const group = consistentGroup();
	const groups = [group];

	const baseRules = applyRuleGroups(groups);

	return [
		{
			name: '@chronoverse-eslint/ts/consistent',
			files: tsFiles,
			plugins: registerGroupsAsPlugins(groups),
			rules: {
				...baseRules,
				...overrides,
			},
		},
	];
};

export { consistentGroups };
