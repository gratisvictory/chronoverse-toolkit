import { defineRuleGroup, type IRuleGroup } from '@chronoverse-toolkit/utils';
import { consistentRules } from '../rules';
import tsEslint from 'typescript-eslint';

const consistentGroup = (): IRuleGroup =>
	defineRuleGroup({
		pluginId: '@ts',
		groupName: 'consistent',
		sourcePlugin: tsEslint.plugin,
		rules: {
			...consistentRules,
		},
	});

export { consistentGroup };
