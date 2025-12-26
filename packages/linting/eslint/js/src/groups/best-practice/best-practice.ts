import type { IOptionsOverrides, TFlatConfigItem } from '../../types';
import { bestPracticeGroup } from './group';
import { applyRuleGroups, registerGroupsAsPlugins, FILES } from '@chronoverse-toolkit/utils';

const { jsFiles } = FILES;

const bestPracticeGroups = async ({ overrides = {} }: IOptionsOverrides): Promise<TFlatConfigItem[]> => {
	const group = bestPracticeGroup();
	const groups = [group];

	const baseRules = applyRuleGroups(groups);

	return [
		{
			name: '@chronoverse-eslint/js/best-practice',
			files: jsFiles,
			plugins: registerGroupsAsPlugins(groups),
			rules: {
				...baseRules,
				...overrides,
			},
		},
	];
};

export { bestPracticeGroups };
