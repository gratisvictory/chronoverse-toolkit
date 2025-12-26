import { isEmpty } from 'es-toolkit/compat';
import type { TPluginName } from '../@types';
import { DEFAULT_PLUGINS } from '../constants';

const createDefaultPlugins = (disablePlugins?: Readonly<TPluginName[]>): string[] => {
	if (isEmpty(disablePlugins)) return DEFAULT_PLUGINS;

	return DEFAULT_PLUGINS.filter(plugin => !(disablePlugins ?? []).includes(plugin));
};

export { createDefaultPlugins };
