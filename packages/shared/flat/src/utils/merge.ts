import type { TEslintConfig } from '../@types';
import { isUndefined } from 'es-toolkit';

const mergeConfigs = <T extends TEslintConfig>(target: T, source: Partial<T>): T => {
	const result = { ...target };

	for (const key in source) {
		const sourceValue = source[key];
		const targetValue = result[key];

		if (isUndefined(sourceValue)) {
			continue;
		}

		if (Array.isArray(sourceValue) && Array.isArray(targetValue)) {
			result[key] = [...targetValue, ...sourceValue] as any;
			continue;
		}

		if (
			sourceValue &&
			typeof sourceValue === 'object' &&
			!Array.isArray(sourceValue) &&
			targetValue &&
			typeof targetValue === 'object' &&
			!Array.isArray(targetValue)
		) {
			result[key] = { ...targetValue, ...sourceValue } as any;
			continue;
		}

		result[key] = sourceValue as any;
	}

	return result;
};

const mergeMultipleConfigs = <T extends TEslintConfig>(configs: T[]): T => {
	if (configs.length === 0) {
		return {} as T;
	}

	return configs.reduce((acc, config) => mergeConfigs(acc, config));
};

export { mergeConfigs, mergeMultipleConfigs };
