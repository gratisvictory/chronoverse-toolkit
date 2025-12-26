import { isNil } from 'es-toolkit';
import type { Linter } from 'eslint';

type TRules = Record<string, Linter.RuleEntry<any>>;
type TRulesInput = Record<string, Linter.RuleEntry<any> | undefined>;

interface ITransformRulePrefixOptions {
	rules: TRulesInput;
	fromPrefix: string;
	toPrefix: string;
}

interface IStripRulePrefixOptions {
	rules: TRulesInput;
	prefix: string;
}

const transformRulePrefix = ({ rules, fromPrefix, toPrefix }: ITransformRulePrefixOptions): TRules => {
	const transformedRules: TRules = {};

	for (const [ruleName, ruleConfig] of Object.entries(rules)) {
		if (isNil(ruleConfig)) {
			continue;
		}

		if (ruleName.startsWith(fromPrefix)) {
			const newRuleName = ruleName.replace(fromPrefix, toPrefix);
			transformedRules[newRuleName] = ruleConfig;
		} else {
			transformedRules[ruleName] = ruleConfig;
		}
	}

	return transformedRules;
};

const stripRulePrefix = ({ rules, prefix }: IStripRulePrefixOptions): TRules => {
	const strippedRules: TRules = {};

	for (const [ruleName, ruleConfig] of Object.entries(rules)) {
		if (isNil(ruleConfig)) {
			continue;
		}

		const newRuleName = ruleName.startsWith(prefix) ? ruleName.replace(prefix, '') : ruleName;
		strippedRules[newRuleName] = ruleConfig;
	}

	return strippedRules;
};

export { transformRulePrefix, stripRulePrefix };
export type { ITransformRulePrefixOptions, IStripRulePrefixOptions };
