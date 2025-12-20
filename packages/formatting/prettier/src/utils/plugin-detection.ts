import { isPackageExists } from 'local-pkg';
import type { TPluginName } from '../@types';

interface IPluginDetectionConfig {
	packageName: string;
	pluginName: TPluginName;
}

const OPTIONAL_PLUGINS: IPluginDetectionConfig[] = [
	{
		packageName: 'tailwindcss',
		pluginName: 'prettier-plugin-tailwindcss',
	},
];

const detectOptionalPlugins = (): TPluginName[] => {
	const detectedPlugins: TPluginName[] = [];

	for (const { packageName, pluginName } of OPTIONAL_PLUGINS) {
		try {
			const exists = isPackageExists(packageName);
			if (exists) detectedPlugins.push(pluginName);
		} catch (error) {
			console.log(`Failed to detect package "${packageName}":`, error);
		}
	}

	return detectedPlugins;
};

export { detectOptionalPlugins };
