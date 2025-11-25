import type { Linter } from 'eslint';
import { processRuleGroups } from './process-rule-groups';
import type { TRuleGroup, TRules } from '../@types';

const applyRuleGroups = <T extends Linter.RuleEntry = Linter.RuleEntry>(groups: TRuleGroup<T>[]): TRules<T> =>
	processRuleGroups(groups, 'rules') as TRules<T>;

export { applyRuleGroups };
