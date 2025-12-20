import type { Linter } from 'eslint';
import type { IRuleGroup } from '../@types';

const defineRuleGroup = <T extends Linter.RuleEntry = Linter.RuleEntry>({
	pluginId,
	groupName,
	rules,
	sourcePlugin,
}: IRuleGroup<T>): IRuleGroup<T> => ({
	pluginId,
	groupName,
	sourcePlugin,
	rules,
});

export { defineRuleGroup };
