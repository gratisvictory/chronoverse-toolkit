import type { TPrettierConfig, TPluginName } from '../@types';

const DEFAULT_PLUGINS: TPluginName[] = [
	'prettier-plugin-packagejson',
	'prettier-plugin-sort-json',
	'prettier-plugin-multiline-arrays',
];

const OPTIONAL_PLUGINS: TPluginName[] = ['prettier-plugin-tailwindcss'];

const createBaseConfig = (): TPrettierConfig => ({
	printWidth: 120,
	tabWidth: 4,
	useTabs: true,
	semi: true,
	singleQuote: true,
	jsxSingleQuote: true,
	trailingComma: 'all',
	quoteProps: 'as-needed',
	bracketSpacing: true,
	bracketSameLine: false,
	arrowParens: 'avoid',
	proseWrap: 'preserve',
	endOfLine: 'lf',
	multilineArraysWrapThreshold: 3,
});

const createJsonOverride = (): NonNullable<TPrettierConfig['overrides']> => [
	{
		files: [
			'*.json',
			'*.jsonc',
			'*.json5',
		],
		options: {
			tabWidth: 2,
			useTabs: false,
		},
	},
];

const createDefaultPlugins = (disablePlugins?: Readonly<TPluginName[]>): string[] => {
	if (!disablePlugins || disablePlugins.length === 0) return DEFAULT_PLUGINS;

	return DEFAULT_PLUGINS.filter(plugin => !disablePlugins.includes(plugin));
};

export { createBaseConfig, createJsonOverride, createDefaultPlugins, DEFAULT_PLUGINS, OPTIONAL_PLUGINS };
