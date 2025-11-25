import type { TRemoveOperation, TRemovePluginsOperation, TRemoveRulesOperation, TEslintConfig } from '../@types';
import { getConfigIndex } from '../utils';

const createRemoveOperation = <T extends TEslintConfig>(target: string | number): TRemoveOperation<T> => ({
	type: 'remove',
	target,
	executor: async configs => {
		const index = getConfigIndex(configs, target);
		const result = [...configs];
		result.splice(index, 1);
		return result;
	},
});

const createRemoveRulesOperation = <T extends TEslintConfig>(rules: string[]): TRemoveRulesOperation<T> => ({
	type: 'removeRules',
	rules,
	executor: async configs =>
		configs.map(config => {
			if (!config.rules) {
				return config;
			}

			const configRules = { ...config.rules };
			for (const rule of rules) {
				delete configRules[rule];
			}

			return { ...config, rules: configRules as typeof config.rules };
		}),
});

const createRemovePluginsOperation = <T extends TEslintConfig>(plugins: string[]): TRemovePluginsOperation<T> => ({
	type: 'removePlugins',
	plugins,
	executor: async configs =>
		configs.map(config => {
			const result = { ...config };

			if (result.plugins && typeof result.plugins === 'object') {
				const configPlugins = { ...result.plugins };
				for (const plugin of plugins) {
					delete configPlugins[plugin];
				}
				result.plugins = configPlugins as typeof result.plugins;
			}

			if (result.rules && typeof result.rules === 'object') {
				const configRules = { ...result.rules } as Record<string, unknown>;
				for (const key in configRules) {
					if (plugins.some(plugin => key.startsWith(`${plugin}/`))) {
						delete configRules[key];
					}
				}
				result.rules = configRules as typeof result.rules;
			}

			return result;
		}),
});

export { createRemoveOperation, createRemoveRulesOperation, createRemovePluginsOperation };
