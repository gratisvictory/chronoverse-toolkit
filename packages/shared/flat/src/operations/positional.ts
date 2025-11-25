import type {
	TAppendOperation,
	TInsertAfterOperation,
	TInsertBeforeOperation,
	TPrependOperation,
	TEslintConfig,
	TResolvableConfig,
} from '../@types';
import { getConfigIndex, resolveConfigs } from '../utils';

const createAppendOperation = <T extends TEslintConfig>(items: TResolvableConfig<T>[]): TAppendOperation<T> => ({
	type: 'append',
	items,
	executor: async configs => {
		const resolved = await resolveConfigs(items);
		return [...configs, ...resolved];
	},
});

const createPrependOperation = <T extends TEslintConfig>(items: TResolvableConfig<T>[]): TPrependOperation<T> => ({
	type: 'prepend',
	items,
	executor: async configs => {
		const resolved = await resolveConfigs(items);
		return [...resolved, ...configs];
	},
});

const createInsertBeforeOperation = <T extends TEslintConfig>(
	target: string | number,
	items: TResolvableConfig<T>[],
): TInsertBeforeOperation<T> => ({
	type: 'insertBefore',
	target,
	items,
	executor: async configs => {
		const resolved = await resolveConfigs(items);
		const index = getConfigIndex(configs, target);
		const result = [...configs];
		result.splice(index, 0, ...resolved);
		return result;
	},
});

const createInsertAfterOperation = <T extends TEslintConfig>(
	target: string | number,
	items: TResolvableConfig<T>[],
): TInsertAfterOperation<T> => ({
	type: 'insertAfter',
	target,
	items,
	executor: async configs => {
		const resolved = await resolveConfigs(items);
		const index = getConfigIndex(configs, target);
		const result = [...configs];
		result.splice(index + 1, 0, ...resolved);
		return result;
	},
});

export { createAppendOperation, createPrependOperation, createInsertBeforeOperation, createInsertAfterOperation };
