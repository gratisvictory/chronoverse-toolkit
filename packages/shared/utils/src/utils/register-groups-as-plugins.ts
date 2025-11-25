import type { ESLint, Linter } from 'eslint';
import type { TRuleGroup } from '../@types';
import { processRuleGroups } from './process-rule-groups';

const registerGroupsAsPlugins = <T extends Linter.RuleEntry = Linter.RuleEntry>(
	groups: TRuleGroup<T>[],
): Record<string, ESLint.Plugin> => processRuleGroups(groups, 'plugins') as Record<string, ESLint.Plugin>;

export { registerGroupsAsPlugins };
