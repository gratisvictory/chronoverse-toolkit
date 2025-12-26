import type { TPluginDetectionConfig, TPluginName } from '../@types';

const DEFAULT_PLUGINS: TPluginName[] = [
	'prettier-plugin-packagejson',
	'prettier-plugin-sort-json',
	'prettier-plugin-multiline-arrays',
];

const OPTIONAL_PLUGINS: TPluginDetectionConfig[] = [
	{
		packageName: 'tailwindcss',
		pluginName: 'prettier-plugin-tailwindcss',
	},
];

export { DEFAULT_PLUGINS, OPTIONAL_PLUGINS };
