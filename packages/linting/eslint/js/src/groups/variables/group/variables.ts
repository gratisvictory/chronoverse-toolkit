import { defineRuleGroup, type IRuleGroup } from '@chronoverse-toolkit/utils';
import { variablesRules } from '../rules';
import { builtinRules } from 'eslint/use-at-your-own-risk';
import type { ESLint } from 'eslint';

const jsRulesPlugin: ESLint.Plugin = {
	rules: Object.fromEntries(builtinRules),
};

const variablesGroup = (): IRuleGroup =>
	defineRuleGroup({
		pluginId: '@js',
		groupName: 'errors',
		sourcePlugin: jsRulesPlugin,
		rules: {
			...variablesRules,
		},
	});

export { variablesGroup };
