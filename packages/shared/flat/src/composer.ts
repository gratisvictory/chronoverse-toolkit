import type { TComposer, TComposerState, TConfigOperation, TEslintConfig, TResolvableConfig } from './@types';
import {
	createAppendOperation,
	createInsertAfterOperation,
	createInsertBeforeOperation,
	createOverrideOperation,
	createPrependOperation,
	createRemoveOperation,
	createRemovePluginsOperation,
	createRemoveRulesOperation,
	createReplaceOperation,
	createTransformOperation,
} from './operations';
import { isNil } from 'es-toolkit';

const composer = <T extends TEslintConfig = TEslintConfig>(...initialConfigs: TResolvableConfig<T>[]): TComposer<T> => {
	const state: TComposerState<T> = {
		operations: [],
		operationsOverride: [],
		operationsResolved: [],
		renames: {},
	};

	if (initialConfigs.length > 0) {
		state.operations.push(createAppendOperation(initialConfigs));
	}

	const toConfigs = async (): Promise<T[]> => {
		let configs: T[] = [];

		for (const operation of state.operations) {
			configs = await operation.executor(configs);
		}

		for (const operation of state.operationsOverride) {
			configs = await operation.executor(configs);
		}

		const hasRenames = Object.keys(state.renames).length > 0;
		if (hasRenames) {
			configs = renamePluginsInConfigs(configs, state.renames);
		}

		for (const callback of state.operationsResolved) {
			const result = await callback(configs);
			if (result) {
				configs = result;
			}
		}

		return configs;
	};

	const renamePluginsInConfigs = (configs: T[], renames: Record<string, string>): T[] =>
		configs.map(config => {
			const result = { ...config };

			if (result.plugins && typeof result.plugins === 'object') {
				const plugins = result.plugins as Record<string, unknown>;
				const newPlugins: Record<string, unknown> = {};
				for (const name in plugins) {
					const plugin = plugins[name];
					const newName = renames[name] ?? name;
					newPlugins[newName] = plugin;
				}
				result.plugins = newPlugins as typeof result.plugins;
			}

			if (result.rules && typeof result.rules === 'object') {
				const rules = result.rules as Record<string, unknown>;
				const newRules: Record<string, unknown> = {};
				for (const rule in rules) {
					const value = rules[rule];
					let newRule = rule;
					for (const oldName in renames) {
						const newName = renames[oldName];
						if (newName && rule.startsWith(`${oldName}/`)) {
							newRule = rule.replace(`${oldName}/`, `${newName}/`);
							break;
						}
					}
					newRules[newRule] = value;
				}
				result.rules = newRules as typeof result.rules;
			}

			return result;
		});

	const addOperation = (
		operation: TConfigOperation<T>,
		phase: 'operations' | 'operationsOverride' = 'operations',
	) => {
		state[phase].push(operation);
	};

	const api: TComposer<T> = {
		append: (...items) => {
			addOperation(createAppendOperation(items));
			return api;
		},

		prepend: (...items) => {
			addOperation(createPrependOperation(items));
			return api;
		},

		insertBefore: (target, ...items) => {
			addOperation(createInsertBeforeOperation(target, items));
			return api;
		},

		insertAfter: (target, ...items) => {
			addOperation(createInsertAfterOperation(target, items));
			return api;
		},

		override: (target, config) => {
			addOperation(createOverrideOperation(target, config), 'operationsOverride');
			return api;
		},

		overrides: overrides => {
			for (const target in overrides) {
				const config = overrides[target];
				if (config) {
					addOperation(createOverrideOperation(target, config), 'operationsOverride');
				}
			}
			return api;
		},

		replace: (target, ...items) => {
			addOperation(createReplaceOperation(target, items));
			return api;
		},

		remove: target => {
			addOperation(createRemoveOperation(target));
			return api;
		},

		removeRules: (...rules) => {
			addOperation(createRemoveRulesOperation(rules), 'operationsOverride');
			return api;
		},

		removePlugins: (...plugins) => {
			addOperation(createRemovePluginsOperation(plugins), 'operationsOverride');
			return api;
		},

		overrideRules: rules => {
			addOperation(
				createTransformOperation(async configs =>
					configs.map(config => {
						if (!config.rules) {
							return config;
						}

						const configRules = { ...config.rules } as Record<string, unknown>;
						for (const key in rules) {
							const value = rules[key];
							if (!(key in configRules)) {
								continue;
							}
							if (isNil(value)) {
								delete configRules[key];
							} else {
								configRules[key] = value;
							}
						}

						return { ...config, rules: configRules as typeof config.rules };
					}),
				),
				'operationsOverride',
			);
			return api;
		},

		renamePlugins: renames => {
			state.renames = { ...state.renames, ...renames };
			return api;
		},

		transform: fn => {
			addOperation(createTransformOperation(fn));
			return api;
		},

		onResolved: callback => {
			state.operationsResolved.push(callback);
			return api;
		},

		clone: () => {
			const cloned = composer<T>();
			(cloned as any).state = {
				operations: [...state.operations],
				operationsOverride: [...state.operationsOverride],
				operationsResolved: [...state.operationsResolved],
				renames: { ...state.renames },
			};
			return cloned;
		},

		toConfigs,

		then: (onfulfilled, onrejected) => toConfigs().then(onfulfilled, onrejected),
		catch: onrejected => toConfigs().catch(onrejected),
		finally: onfinally => toConfigs().finally(onfinally),
	};

	return api;
};

export { composer };
