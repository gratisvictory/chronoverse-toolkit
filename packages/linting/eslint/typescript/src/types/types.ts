import type { Linter } from 'eslint';
import type { TFilterByPrefix } from '@chronoverse-toolkit/utils';
import type { TConfigNames, TRuleOptions } from '../../typegen';

type TRules = Record<string, Linter.RuleEntry<any> | undefined> & TRuleOptions;

type TFlatConfigItem = Linter.Config & {
	rules?: TRules | undefined;
};

type TConsistentRules = TFilterByPrefix<TRuleOptions, '@ts/consistent/'>;
type TSafeRules = TFilterByPrefix<TRuleOptions, '@ts/safe/'>;

interface IOptionsOverrides<TFilteredRules = TRules> {
	overrides?: (Record<string, Linter.RuleEntry<any> | undefined> & Partial<TFilteredRules>) | undefined;
}

interface IOptionsConfig {
	consistent?: boolean | IOptionsOverrides<TConsistentRules> | undefined;
	safe?: boolean | IOptionsOverrides<TSafeRules> | undefined;
	overrides?:
		| {
				consistent?:
					| (Record<string, Linter.RuleEntry<any> | undefined> & Partial<TConsistentRules>)
					| undefined;
				safe?: (Record<string, Linter.RuleEntry<any> | undefined> & Partial<TSafeRules>) | undefined;
		  }
		| undefined;
}

export type { TFlatConfigItem, IOptionsOverrides, TConfigNames, TRules, IOptionsConfig, TConsistentRules, TSafeRules };
