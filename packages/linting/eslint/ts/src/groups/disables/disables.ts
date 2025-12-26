import type { IOptionsOverrides, TFlatConfigItem } from '../../types';
import { disablesGroup } from './group';
import { applyRuleGroups, registerGroupsAsPlugins, FILES } from '@chronoverse-toolkit/utils';

const { tsFiles } = FILES;

const disablesGroups = async ({ overrides = {} }: IOptionsOverrides): Promise<TFlatConfigItem[]> => {
	const group = disablesGroup();
	const groups = [group];

	const baseRules = applyRuleGroups(groups);

	return [
		{
			name: '@chronoverse-eslint/ts/disables',
			files: tsFiles,
			plugins: registerGroupsAsPlugins(groups),
			rules: {
				...baseRules,
				...overrides,
			},
		},
	];
};

export { disablesGroups };
