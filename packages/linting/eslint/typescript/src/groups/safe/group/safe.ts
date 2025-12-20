import { defineRuleGroup, type IRuleGroup } from '@chronoverse-toolkit/utils';
import { safeRules } from '../rules';
import safeTsPlugin from '@susisu/eslint-plugin-safe-typescript';

const safeGroup = (): IRuleGroup =>
	defineRuleGroup({
		pluginId: '@ts',
		groupName: 'safe',
		sourcePlugin: safeTsPlugin,
		rules: {
			...safeRules,
		},
	});

export { safeGroup };
