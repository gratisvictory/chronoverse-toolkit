import type { Linter } from 'eslint';
import type { TRuleGroup } from '../@types';

const defineRuleGroup = <T extends Linter.RuleEntry = Linter.RuleEntry>({
	pluginId,
	groupName,
	rules,
	sourcePlugin,
}: TRuleGroup<T>): TRuleGroup<T> => ({
	pluginId,
	groupName,
	sourcePlugin,
	rules,
});

export { defineRuleGroup };
