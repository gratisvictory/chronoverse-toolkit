import type { Linter } from 'eslint';
import { processRuleGroups } from './process-rule-groups';
import type { IRuleGroup, TRules } from '../@types';

const applyRuleGroups = <T extends Linter.RuleEntry = Linter.RuleEntry>(groups: IRuleGroup<T>[]): TRules<T> =>
	processRuleGroups(groups, 'rules') as TRules<T>;

export { applyRuleGroups };
