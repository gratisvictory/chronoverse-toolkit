import type { Awaitable } from './shared';
import type { TEslintConfig, TResolvableConfig } from './config';

type TOperationUnion =
	| 'append'
	| 'prepend'
	| 'insertBefore'
	| 'insertAfter'
	| 'override'
	| 'replace'
	| 'remove'
	| 'removeRules'
	| 'removePlugins'
	| 'overrideRules'
	| 'renamePlugins'
	| 'transform';

type TOperationExecutor<T extends TEslintConfig> = (configs: T[]) => Awaitable<T[]>;

type TBaseOperation<T extends TEslintConfig, Type extends TOperationUnion = TOperationUnion> = Readonly<{
	type: Type;
	executor: TOperationExecutor<T>;
}>;

type TItemsOperation<T extends TEslintConfig, Type extends TOperationUnion = TOperationUnion> = TBaseOperation<
	T,
	Type
> &
	Readonly<{
		items: TResolvableConfig<T>[];
	}>;

type TAppendOperation<T extends TEslintConfig> = TItemsOperation<T, 'append'>;
type TPrependOperation<T extends TEslintConfig> = TItemsOperation<T, 'prepend'>;
type TInsertBeforeOperation<T extends TEslintConfig> = TItemsOperation<T, 'insertBefore'> &
	Readonly<{
		target: string | number;
	}>;
type TInsertAfterOperation<T extends TEslintConfig> = TItemsOperation<T, 'insertAfter'> &
	Readonly<{
		target: string | number;
	}>;

type TOverrideOperation<T extends TEslintConfig> = TBaseOperation<T, 'override'> &
	Readonly<{
		target: string | number;
		config: T | ((config: T) => Awaitable<T>);
	}>;

type TReplaceOperation<T extends TEslintConfig> = TItemsOperation<T, 'replace'> &
	Readonly<{
		target: string | number;
	}>;

type TRemoveOperation<T extends TEslintConfig> = TBaseOperation<T, 'remove'> &
	Readonly<{
		target: string | number;
	}>;

type TRemoveRulesOperation<T extends TEslintConfig> = TBaseOperation<T, 'removeRules'> &
	Readonly<{
		rules: string[];
	}>;

type TRemovePluginsOperation<T extends TEslintConfig> = TBaseOperation<T, 'removePlugins'> &
	Readonly<{
		plugins: string[];
	}>;

type TOverrideRulesOperation<T extends TEslintConfig> = TBaseOperation<T, 'overrideRules'> &
	Readonly<{
		rules: Record<string, any>;
	}>;

type TRenamePluginsOperation<T extends TEslintConfig> = TBaseOperation<T, 'renamePlugins'> &
	Readonly<{
		renames: Record<string, string>;
	}>;

type TTransformOperation<T extends TEslintConfig> = TBaseOperation<T, 'transform'> &
	Readonly<{
		transform: (configs: T[]) => Awaitable<T[]>;
	}>;

type TConfigOperation<T extends TEslintConfig> =
	| TAppendOperation<T>
	| TPrependOperation<T>
	| TInsertBeforeOperation<T>
	| TInsertAfterOperation<T>
	| TOverrideOperation<T>
	| TReplaceOperation<T>
	| TRemoveOperation<T>
	| TRemoveRulesOperation<T>
	| TRemovePluginsOperation<T>
	| TOverrideRulesOperation<T>
	| TRenamePluginsOperation<T>
	| TTransformOperation<T>;

export type {
	TOperationExecutor,
	TOperationUnion,
	TAppendOperation,
	TInsertAfterOperation,
	TInsertBeforeOperation,
	TOverrideOperation,
	TOverrideRulesOperation,
	TPrependOperation,
	TRemoveOperation,
	TRemovePluginsOperation,
	TRemoveRulesOperation,
	TRenamePluginsOperation,
	TReplaceOperation,
	TTransformOperation,
	TConfigOperation,
};
