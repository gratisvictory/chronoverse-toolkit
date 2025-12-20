import type { Linter } from 'eslint';
import type { Awaitable } from './shared';

type TEslintConfig = Linter.Config;

type TResolvableConfig<T extends TEslintConfig = TEslintConfig> =
	| Awaitable<T | T[] | false | null | undefined>
	| Awaitable<(T | false | null | undefined)[]>;

type TConfigName = string;

type TConfigTarget = TConfigName | number;

type TConfigMergeFn<T extends TEslintConfig = TEslintConfig> = (target: T, source: T) => T;

type TConfigTransformFn<T extends TEslintConfig = TEslintConfig> = (config: T) => Awaitable<T>;

export type { TEslintConfig, TResolvableConfig, TConfigTarget, TConfigMergeFn, TConfigTransformFn };
