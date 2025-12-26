import { defineRuleGroup, type IRuleGroup } from '@chronoverse-toolkit/utils';
import { disablesRules } from '../rules';
import tsEslint from 'typescript-eslint';

const disablesGroup = (): IRuleGroup =>
	defineRuleGroup({
		pluginId: '@ts',
		groupName: 'disables',
		sourcePlugin: tsEslint.plugin,
		rules: {
			...disablesRules,
		},
	});

export { disablesGroup };
