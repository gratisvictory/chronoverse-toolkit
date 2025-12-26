import type { Linter } from 'eslint';
import type { TFilterByPrefix, TMaybeBoolean, TMaybeUndefined } from '@chronoverse-toolkit/types';
import type { ParserOptions } from '@typescript-eslint/parser';
import type { TConfigNames, TRuleOptions } from '../../typegen';

type TRules = Record<string, TMaybeUndefined<Linter.RuleEntry<any>>> & TRuleOptions;

type TFlatConfigItem = Linter.Config & {
	rules?: TMaybeUndefined<TRules>;
};

type TConsistentRules = TFilterByPrefix<TRuleOptions, '@ts/consistent/'>;
type TSafeRules = TFilterByPrefix<TRuleOptions, '@ts/safe/'>;
type TDisablesRules = TFilterByPrefix<TRuleOptions, '@ts/disables/'>;

interface IOptionsOverrides<TFilteredRules = TRules> {
	overrides?: TMaybeUndefined<Record<string, TMaybeUndefined<Linter.RuleEntry<any>>> & Partial<TFilteredRules>>;
}

interface IOptionsConfig {
	tsProjectService?: TMaybeUndefined<ParserOptions['projectService']>;
	tsProject?: TMaybeUndefined<ParserOptions['project']>;
	tsconfigRootDir?: TMaybeUndefined<ParserOptions['tsconfigRootDir']>;
	consistent?: TMaybeBoolean<TMaybeUndefined<IOptionsOverrides<TConsistentRules>>>;
	safe?: TMaybeBoolean<TMaybeUndefined<IOptionsOverrides<TSafeRules>>>;
	disables?: TMaybeBoolean<TMaybeUndefined<IOptionsOverrides<TDisablesRules>>>;
	overrides?: TMaybeUndefined<{
		consistent?: TMaybeUndefined<
			Record<string, TMaybeUndefined<Linter.RuleEntry<any>>> & Partial<TConsistentRules>
		>;
		safe?: TMaybeUndefined<Record<string, TMaybeUndefined<Linter.RuleEntry<any>>> & Partial<TSafeRules>>;
		disables?: TMaybeUndefined<Record<string, TMaybeUndefined<Linter.RuleEntry<any>>> & Partial<TDisablesRules>>;
	}>;
}

export type {
	TFlatConfigItem,
	IOptionsOverrides,
	TConfigNames,
	TRules,
	IOptionsConfig,
	TConsistentRules,
	TSafeRules,
	TDisablesRules,
};
