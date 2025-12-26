import { merge, difference, concat } from 'es-toolkit/compat';
import type { TPrettierOptions, TPrettierConfig, TPluginNameExtended } from './@types';
import { createBaseConfig, createDefaultOverrides, createDefaultPlugins } from './configs';
import { detectOptionalPlugins } from './utils';

const prettier = <TDisabled extends TPluginNameExtended = undefined>(
	options?: TPrettierOptions<TDisabled>,
): TPrettierConfig => {
	const baseConfig = createBaseConfig();
	const mergedConfig = options?.config ? merge(baseConfig, options.config) : baseConfig;

	const defaultOverrides = createDefaultOverrides();
	const finalOverrides = options?.overrides ? concat(defaultOverrides, options.overrides) : defaultOverrides;

	const defaultPlugins = createDefaultPlugins(options?.disablePlugins);
	const detectedPlugins = detectOptionalPlugins();
	const disabledPlugins = options?.disablePlugins ?? [];
	const enabledDetectedPlugins = difference(detectedPlugins, disabledPlugins);
	const allPlugins = concat(defaultPlugins, enabledDetectedPlugins);
	const finalPlugins = options?.plugins ? concat(allPlugins, options.plugins) : allPlugins;

	const config: TPrettierConfig = {
		...mergedConfig,
		plugins: finalPlugins,
		overrides: finalOverrides,
	};

	return config;
};

export { prettier };
