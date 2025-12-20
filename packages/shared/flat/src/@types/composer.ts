import type { Awaitable } from './shared';
import type { TConfigOperation } from './operation';
import type { TConfigTarget, TEslintConfig, TResolvableConfig } from './config';

interface IComposer<T extends TEslintConfig = TEslintConfig> {
	append(...items: TResolvableConfig<T>[]): IComposer<T>;
	prepend(...items: TResolvableConfig<T>[]): IComposer<T>;
	insertBefore(target: TConfigTarget, ...items: TResolvableConfig<T>[]): IComposer<T>;
	insertAfter(target: TConfigTarget, ...items: TResolvableConfig<T>[]): IComposer<T>;

	override(target: TConfigTarget, config: T | ((config: T) => Awaitable<T>)): IComposer<T>;
	overrides(overrides: Partial<Record<TConfigTarget, T | ((config: T) => Awaitable<T>)>>): IComposer<T>;
	replace(target: TConfigTarget, ...items: TResolvableConfig<T>[]): IComposer<T>;

	remove(target: TConfigTarget): IComposer<T>;
	removeRules(...rules: string[]): IComposer<T>;
	removePlugins(...plugins: string[]): IComposer<T>;

	overrideRules(rules: Record<string, any>): IComposer<T>;

	renamePlugins(renames: Record<string, string>): IComposer<T>;

	transform(fn: (configs: T[]) => Awaitable<T[]>): IComposer<T>;

	onResolved(callback: (configs: T[]) => Awaitable<T[] | void>): IComposer<T>;

	clone(): IComposer<T>;
	toConfigs(): Promise<T[]>;

	then<TResult1 = T[], TResult2 = never>(
		onfulfilled?: ((value: T[]) => TResult1 | PromiseLike<TResult1>) | null,
		onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | null,
	): Promise<TResult1 | TResult2>;
	catch<TResult = never>(
		onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | null,
	): Promise<T[] | TResult>;
	finally(onfinally?: (() => void) | null): Promise<T[]>;
}

interface IComposerState<T extends TEslintConfig = TEslintConfig> {
	operations: TConfigOperation<T>[];
	operationsOverride: TConfigOperation<T>[];
	operationsResolved: ((configs: T[]) => Awaitable<T[] | void>)[];
	renames: Record<string, string>;
}

type TChronoverse<T extends TEslintConfig = TEslintConfig> = IComposer<T>;

type TChronoverseInput<T extends TEslintConfig = TEslintConfig> = TResolvableConfig<T> | IComposer<T>;

type TChronoverseCallback<T extends TEslintConfig = TEslintConfig> = (
	composerFn: (...configs: TChronoverseInput<T>[]) => IComposer<T>,
) => IComposer<T>;

export type { IComposer, IComposerState, TChronoverse, TChronoverseCallback, TChronoverseInput };
