import type { TFlatConfigItem } from '../../../types';
import { stripRulePrefix } from '@chronoverse-toolkit/utils';
import safeTsPlugin from '@susisu/eslint-plugin-safe-typescript';

const safeTsPluginRecommendedRules = safeTsPlugin.configs.recommended.rules;

const strippedSafeTsRules = safeTsPluginRecommendedRules
	? stripRulePrefix({
			rules: safeTsPluginRecommendedRules,
			prefix: '@susisu/safe-typescript/',
		})
	: {};

const safeRules: TFlatConfigItem['rules'] = {
	...strippedSafeTsRules,
};

export { safeRules };
