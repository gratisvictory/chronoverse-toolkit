import { isNotNil } from 'es-toolkit';
import type { ESLint, Linter } from 'eslint';
import type { TRuleGroup, TRules } from '../@types';

type TProcessMode = 'rules' | 'plugins';

const processRuleGroups = <T extends Linter.RuleEntry = Linter.RuleEntry>(
	groups: TRuleGroup<T>[],
	mode: TProcessMode = 'rules',
): TRules<T> | Record<string, ESLint.Plugin> => {
	if (mode === 'plugins') {
		const plugins: Record<string, ESLint.Plugin> = {};

		for (const { pluginId, groupName, rules, sourcePlugin } of groups) {
			const fullPluginId = `${pluginId}/${groupName}`;

			if (sourcePlugin?.rules) {
				const pluginRules: Record<string, any> = {};

				for (const [name, ruleConfig] of Object.entries(rules)) {
					if (isNotNil(ruleConfig) && sourcePlugin.rules[name]) {
						pluginRules[name] = sourcePlugin.rules[name];
					}
				}

				plugins[fullPluginId] = {
					rules: pluginRules,
				};
			} else {
				plugins[fullPluginId] = {
					rules: {},
				};
			}
		}

		return plugins;
	}

	const configRules: Partial<TRules<T>> = {};

	for (const { pluginId, groupName, rules } of groups) {
		const prefix = `${pluginId}/${groupName}`;
		for (const [name, ruleConfig] of Object.entries(rules)) {
			if (isNotNil(ruleConfig)) {
				configRules[`${prefix}/${name}`] = ruleConfig;
			}
		}
	}

	return configRules as TRules<T>;
};

export { processRuleGroups };
