import type { Config } from 'prettier';
import type { SortJsonOptions } from 'prettier-plugin-sort-json';
import type { MultilineArrayOptions } from 'prettier-plugin-multiline-arrays';
import type { PluginOptions as TailwindcssPluginOptions } from 'prettier-plugin-tailwindcss';

type TPrettierBaseOptions = Config;

type TPluginName =
	| 'prettier-plugin-packagejson'
	| 'prettier-plugin-sort-json'
	| 'prettier-plugin-multiline-arrays'
	| 'prettier-plugin-tailwindcss';

interface IPluginOptionsMap {
	'prettier-plugin-sort-json': SortJsonOptions;
	'prettier-plugin-multiline-arrays': MultilineArrayOptions;
	'prettier-plugin-tailwindcss': TailwindcssPluginOptions;
	'prettier-plugin-packagejson': object;
}

type TUnionToIntersection<U> = (U extends unknown ? (k: U) => void : never) extends (k: infer I) => void ? I : never;

type TAvailablePlugins<TDisabled extends readonly TPluginName[] | undefined> = TDisabled extends readonly TPluginName[]
	? Exclude<TPluginName, TDisabled[number]>
	: TPluginName;

type TPluginOptionsForEnabled<TDisabled extends readonly TPluginName[] | undefined> = TUnionToIntersection<
	TAvailablePlugins<TDisabled> extends infer TEnabled
		? TEnabled extends TPluginName
			? IPluginOptionsMap[TEnabled]
			: never
		: never
>;

type TPrettierConfigWithPlugins<TDisabled extends readonly TPluginName[] | undefined> = Partial<
	TPrettierBaseOptions & TPluginOptionsForEnabled<TDisabled>
>;

interface IPrettierOptions<TDisabled extends readonly TPluginName[] | undefined = undefined> {
	config?: TPrettierConfigWithPlugins<TDisabled>;
	plugins?: string[];
	overrides?: Config['overrides'];
	disablePlugins?: TDisabled;
}

type TPrettierConfig = Partial<
	TPrettierBaseOptions & SortJsonOptions & MultilineArrayOptions & TailwindcssPluginOptions
>;

export type {
	TPrettierConfig,
	IPrettierOptions,
	TPluginName,
	SortJsonOptions,
	MultilineArrayOptions,
	TailwindcssPluginOptions,
};
