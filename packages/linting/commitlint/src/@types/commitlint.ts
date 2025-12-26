import type { UserConfig, RuleConfigTuple } from '@commitlint/types';
import type { Merge, Simplify } from 'type-fest';
import type { IEmojiConfig } from './emoji';
import type { INxScopesConfig } from './nx';

type TCommitlintConfig = UserConfig;

type ICommitlintConfigOptions = Simplify<
	Merge<
		TCommitlintConfig,
		{
			/** Nx workspace scopes configuration */
			nxScopes?: INxScopesConfig;

			/** Emoji configuration for commit messages */
			emoji?: IEmojiConfig;
		}
	>
>;

type TAsyncRule<T = unknown> = () => Promise<RuleConfigTuple<T>>;

type TScopeEnumRule = TAsyncRule<string[]>;

export type { ICommitlintConfigOptions, TCommitlintConfig, TScopeEnumRule };
