import type { ESLint, Linter } from 'eslint';
import type { IRuleGroup } from '../@types';
import { processRuleGroups } from './process-rule-groups';

const registerGroupsAsPlugins = <T extends Linter.RuleEntry = Linter.RuleEntry>(
	groups: IRuleGroup<T>[],
): Record<string, ESLint.Plugin> => processRuleGroups(groups, 'plugins') as Record<string, ESLint.Plugin>;

export { registerGroupsAsPlugins };
