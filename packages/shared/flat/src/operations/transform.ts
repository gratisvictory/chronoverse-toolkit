import type {
	TOverrideOperation,
	TReplaceOperation,
	TTransformOperation,
	TEslintConfig,
	TResolvableConfig,
} from '../@types';
import { getConfigIndex, mergeConfigs, resolveConfigs } from '../utils';

const createOverrideOperation = <T extends TEslintConfig>(
	target: string | number,
	config: T | ((config: T) => T | Promise<T>),
): TOverrideOperation<T> => ({
	type: 'override',
	target,
	config,
	executor: async configs => {
		const index = getConfigIndex(configs, target);
		const result = [...configs];
		const currentConfig = configs[index]!;

		const extended =
			typeof config === 'function' ? await config(currentConfig) : (mergeConfigs(currentConfig, config) as T);

		result[index] = extended;
		return result;
	},
});

const createReplaceOperation = <T extends TEslintConfig>(
	target: string | number,
	items: TResolvableConfig<T>[],
): TReplaceOperation<T> => ({
	type: 'replace',
	target,
	items,
	executor: async configs => {
		const resolved = await resolveConfigs(items);
		const index = getConfigIndex(configs, target);
		const result = [...configs];
		result.splice(index, 1, ...resolved);
		return result;
	},
});

const createTransformOperation = <T extends TEslintConfig>(
	transform: (configs: T[]) => T[] | Promise<T[]>,
): TTransformOperation<T> => ({
	type: 'transform',
	transform,
	executor: async configs => transform(configs),
});

export { createOverrideOperation, createReplaceOperation, createTransformOperation };
