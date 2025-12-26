import type { Linter } from 'eslint';
import type { TFilterByPrefix } from '@chronoverse-toolkit/utils';
import type { TConfigNames, TRuleOptions } from '../../typegen';

type TRules = Record<string, Linter.RuleEntry<any> | undefined> & TRuleOptions;

type TFlatConfigItem = Linter.Config & {
	rules?: TRules | undefined;
};

type TBestPracticeRules = TFilterByPrefix<TRuleOptions, '@js/best-practice/'>;
type TErrorsRules = TFilterByPrefix<TRuleOptions, '@js/errors/'>;
type TVariablesRules = TFilterByPrefix<TRuleOptions, '@js/variables/'>;

interface IOptionsOverrides<TFilteredRules = TRules> {
	overrides?: (Record<string, Linter.RuleEntry<any> | undefined> & Partial<TFilteredRules>) | undefined;
}

interface IOptionsConfig {
	bestPractice?: boolean | IOptionsOverrides<TBestPracticeRules> | undefined;
	errors?: boolean | IOptionsOverrides<TErrorsRules> | undefined;
	variables?: boolean | IOptionsOverrides<TVariablesRules> | undefined;
	overrides?:
		| {
				bestPractice?:
					| (Record<string, Linter.RuleEntry<any> | undefined> & Partial<TBestPracticeRules>)
					| undefined;
				errors?: (Record<string, Linter.RuleEntry<any> | undefined> & Partial<TErrorsRules>) | undefined;
				variables?: (Record<string, Linter.RuleEntry<any> | undefined> & Partial<TVariablesRules>) | undefined;
		  }
		| undefined;
}

export type {
	TFlatConfigItem,
	IOptionsOverrides,
	TConfigNames,
	TRules,
	IOptionsConfig,
	TBestPracticeRules,
	TErrorsRules,
	TVariablesRules,
};
