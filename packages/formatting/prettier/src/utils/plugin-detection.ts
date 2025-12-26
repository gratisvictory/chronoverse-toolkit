import { isPackageExists } from 'local-pkg';
import type { TPluginName } from '../@types';
import { OPTIONAL_PLUGINS } from '../constants';

const detectOptionalPlugins = (): TPluginName[] => {
	const detectedPlugins: TPluginName[] = [];

	for (const { packageName, pluginName } of OPTIONAL_PLUGINS) {
		try {
			const exists = isPackageExists(packageName);
			if (exists) detectedPlugins.push(pluginName);
		} catch (error: unknown) {
			console.error(`❌ Failed to detect package "${packageName}":`, error);
		}
	}

	return detectedPlugins;
};

export { detectOptionalPlugins };
