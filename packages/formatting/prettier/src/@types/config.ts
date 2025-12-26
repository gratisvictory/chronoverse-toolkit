import type { Simplify, EmptyObject, Get, LiteralUnion, UnionToIntersection } from 'type-fest';
import type { Config } from 'prettier';
import type { SortJsonOptions } from 'prettier-plugin-sort-json';
import type { MultilineArrayOptions } from 'prettier-plugin-multiline-arrays';
import type { PluginOptions as TailwindcssPluginOptions } from 'prettier-plugin-tailwindcss';
import type { TMaybeUndefined } from '@chronoverse-toolkit/types';
import type { TAvailablePlugins } from './shared';

type TPrettierBaseOptions = Config;

type TPluginName =
	| 'prettier-plugin-packagejson'
	| 'prettier-plugin-sort-json'
	| 'prettier-plugin-multiline-arrays'
	| 'prettier-plugin-tailwindcss';

type TPluginOptionsMap = Readonly<{
	'prettier-plugin-sort-json': SortJsonOptions;
	'prettier-plugin-multiline-arrays': MultilineArrayOptions;
	'prettier-plugin-tailwindcss': TailwindcssPluginOptions;
	'prettier-plugin-packagejson': EmptyObject;
}>;

type TPluginNameExtended = TMaybeUndefined<Readonly<TPluginName[]>>;

type TPluginOptionsForEnabled<TDisabled extends TPluginNameExtended> = UnionToIntersection<
	TAvailablePlugins<TDisabled> extends infer TEnabled
		? TEnabled extends TPluginName
			? TPluginOptionsMap[TEnabled]
			: never
		: never
>;

type TPrettierConfigWithPlugins<TDisabled extends TPluginNameExtended> = Simplify<
	Partial<TPrettierBaseOptions & TPluginOptionsForEnabled<TDisabled>>
>;

type TPrettierOptions<TDisabled extends TPluginNameExtended = undefined> = Readonly<{
	config?: TPrettierConfigWithPlugins<TDisabled>;
	plugins?: Readonly<LiteralUnion<TPluginName, string>[]>;
	overrides?: Get<Config, 'overrides'>;
	disablePlugins?: TDisabled;
}>;

type TPrettierConfig = Simplify<
	Partial<TPrettierBaseOptions & SortJsonOptions & MultilineArrayOptions & TailwindcssPluginOptions>
>;

export type {
	TPrettierBaseOptions,
	TPluginName,
	TPluginOptionsMap,
	TPluginNameExtended,
	TPluginOptionsForEnabled,
	TPrettierConfigWithPlugins,
	TPrettierOptions,
	TPrettierConfig,
};
