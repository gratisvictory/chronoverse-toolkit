import type { IPrettierOptions, TPrettierConfig, TPluginName } from './@types';
import { createBaseConfig, createJsonOverride, createDefaultPlugins } from './configs';
import { detectOptionalPlugins } from './utils';

const prettier = <TDisabled extends readonly TPluginName[] | undefined = undefined>(
	options?: IPrettierOptions<TDisabled>,
): TPrettierConfig => {
	const baseConfig = createBaseConfig();
	const mergedConfig = options?.config ? { ...baseConfig, ...options.config } : baseConfig;

	const defaultOverrides = createJsonOverride();
	const finalOverrides = options?.overrides
		? [
				...defaultOverrides,
				...options.overrides,
			]
		: defaultOverrides;

	const defaultPlugins = createDefaultPlugins(options?.disablePlugins);
	const detectedPlugins = detectOptionalPlugins();

	const filteredDetectedPlugins = detectedPlugins.filter(plugin => {
		const isDisabled = options?.disablePlugins?.includes(plugin);
		return !isDisabled;
	});

	const allPlugins = [
		...defaultPlugins,
		...filteredDetectedPlugins,
	];
	const finalPlugins = options?.plugins
		? [
				...allPlugins,
				...options.plugins,
			]
		: allPlugins;

	const config: TPrettierConfig = {
		...mergedConfig,
		plugins: finalPlugins,
		overrides: finalOverrides,
	};

	return config;
};

export { prettier };
