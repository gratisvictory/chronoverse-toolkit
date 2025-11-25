import type { Awaitable } from './shared';
import type { TConfigOperation } from './operation';
import type { TConfigTarget, TEslintConfig, TResolvableConfig } from './config';

type TComposer<T extends TEslintConfig = TEslintConfig> = {
	append(...items: TResolvableConfig<T>[]): TComposer<T>;
	prepend(...items: TResolvableConfig<T>[]): TComposer<T>;
	insertBefore(target: TConfigTarget, ...items: TResolvableConfig<T>[]): TComposer<T>;
	insertAfter(target: TConfigTarget, ...items: TResolvableConfig<T>[]): TComposer<T>;

	override(target: TConfigTarget, config: T | ((config: T) => Awaitable<T>)): TComposer<T>;
	overrides(overrides: Partial<Record<TConfigTarget, T | ((config: T) => Awaitable<T>)>>): TComposer<T>;
	replace(target: TConfigTarget, ...items: TResolvableConfig<T>[]): TComposer<T>;

	remove(target: TConfigTarget): TComposer<T>;
	removeRules(...rules: string[]): TComposer<T>;
	removePlugins(...plugins: string[]): TComposer<T>;

	overrideRules(rules: Record<string, any>): TComposer<T>;

	renamePlugins(renames: Record<string, string>): TComposer<T>;

	transform(fn: (configs: T[]) => Awaitable<T[]>): TComposer<T>;

	onResolved(callback: (configs: T[]) => Awaitable<T[] | void>): TComposer<T>;

	clone(): TComposer<T>;
	toConfigs(): Promise<T[]>;

	then<TResult1 = T[], TResult2 = never>(
		onfulfilled?: ((value: T[]) => TResult1 | PromiseLike<TResult1>) | null,
		onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | null,
	): Promise<TResult1 | TResult2>;
	catch<TResult = never>(
		onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | null,
	): Promise<T[] | TResult>;
	finally(onfinally?: (() => void) | null): Promise<T[]>;
};

type TComposerState<T extends TEslintConfig = TEslintConfig> = {
	operations: TConfigOperation<T>[];
	operationsOverride: TConfigOperation<T>[];
	operationsResolved: ((configs: T[]) => Awaitable<T[] | void>)[];
	renames: Record<string, string>;
};

type TChronoverse<T extends TEslintConfig = TEslintConfig> = TComposer<T>;

type TChronoverseInput<T extends TEslintConfig = TEslintConfig> = TResolvableConfig<T> | TComposer<T>;

type TChronoverseCallback<T extends TEslintConfig = TEslintConfig> = (
	composerFn: (...configs: TChronoverseInput<T>[]) => TComposer<T>,
) => TComposer<T>;

export type { TComposer, TComposerState, TChronoverse, TChronoverseCallback, TChronoverseInput };
