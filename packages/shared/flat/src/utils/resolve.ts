import type { TEslintConfig, TResolvableConfig } from '../@types';
import { isNotNil } from 'es-toolkit';

const resolveConfigs = async <T extends TEslintConfig>(configs: TResolvableConfig<T>[]): Promise<T[]> => {
	const resolved = await Promise.all(configs);
	const flattened = resolved.flat();
	return flattened.filter((config): config is T => isNotNil(config));
};

const getConfigIndex = <T extends TEslintConfig>(configs: T[], target: string | number): number => {
	if (typeof target === 'number') {
		if (target < 0 || target >= configs.length) {
			throw new Error(`Failed to locate config at index ${target} (${configs.length} configs in total)`);
		}
		return target;
	}

	const index = configs.findIndex(config => config.name === target);
	if (index === -1) {
		const named = configs.map(config => config.name).filter(Boolean);
		const countUnnamed = configs.length - named.length;
		const messages = [
			`Failed to locate config with name "${target}"`,
			named.length > 0 && `Available names: ${named.join(', ')}`,
			countUnnamed > 0 && `(${countUnnamed} unnamed configs)`,
		]
			.filter(Boolean)
			.join('\n');

		throw new Error(messages);
	}

	return index;
};

export { resolveConfigs, getConfigIndex };
