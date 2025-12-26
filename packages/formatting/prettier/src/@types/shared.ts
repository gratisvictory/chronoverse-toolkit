import type { ArrayValues } from 'type-fest';
import type { TPluginName, TPluginNameExtended } from './config';

type TPluginDetectionConfig = Readonly<{
	packageName: string;
	pluginName: TPluginName;
}>;

type TAvailablePlugins<TDisabled extends TPluginNameExtended> =
	TDisabled extends Readonly<TPluginName[]> ? Exclude<TPluginName, ArrayValues<TDisabled>> : TPluginName;

export type { TPluginDetectionConfig, TAvailablePlugins };
