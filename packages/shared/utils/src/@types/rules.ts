import type { ESLint, Linter } from 'eslint';
import type { Awaitable } from './shared';

interface IRuleGroup<T extends Linter.RuleEntry = Linter.RuleEntry> {
	pluginId?: string | undefined;
	groupName?: string | undefined;
	rules: Partial<Record<string, T>>;
	sourcePlugin?: ESLint.Plugin | undefined;
}

type TRules<T extends Linter.RuleEntry = Linter.RuleEntry> = Record<string, T>;

export type { IRuleGroup, Awaitable, TRules };
