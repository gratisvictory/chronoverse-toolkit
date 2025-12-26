import { defineRuleGroup, type IRuleGroup } from '@chronoverse-toolkit/utils';
import { errorsRules } from '../rules';
import { builtinRules } from 'eslint/use-at-your-own-risk';
import type { ESLint } from 'eslint';

const jsRulesPlugin: ESLint.Plugin = {
	rules: Object.fromEntries(builtinRules),
};

const errorsGroup = (): IRuleGroup =>
	defineRuleGroup({
		pluginId: '@js',
		groupName: 'errors',
		sourcePlugin: jsRulesPlugin,
		rules: {
			...errorsRules,
		},
	});

export { errorsGroup };
