import { defineRuleGroup, type IRuleGroup } from '@chronoverse-toolkit/utils';
import { bestPracticeRules } from '../rules';
import { builtinRules } from 'eslint/use-at-your-own-risk';
import type { ESLint } from 'eslint';

const jsRulesPlugin: ESLint.Plugin = {
	rules: Object.fromEntries(builtinRules),
};

const bestPracticeGroup = (): IRuleGroup =>
	defineRuleGroup({
		pluginId: '@js',
		groupName: 'best-practice',
		sourcePlugin: jsRulesPlugin,
		rules: {
			...bestPracticeRules,
		},
	});

export { bestPracticeGroup };
