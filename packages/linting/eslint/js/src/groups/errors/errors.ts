import type { IOptionsOverrides, TFlatConfigItem } from '../../types';
import { errorsGroup } from './group';
import { applyRuleGroups, registerGroupsAsPlugins, FILES } from '@chronoverse-toolkit/utils';

const { jsFiles } = FILES;

const errorsGroups = async ({ overrides = {} }: IOptionsOverrides): Promise<TFlatConfigItem[]> => {
	const group = errorsGroup();
	const groups = [group];

	const baseRules = applyRuleGroups(groups);

	return [
		{
			name: '@chronoverse-eslint/js/errors',
			files: jsFiles,
			plugins: registerGroupsAsPlugins(groups),
			rules: {
				...baseRules,
				...overrides,
			},
		},
	];
};

export { errorsGroups };
