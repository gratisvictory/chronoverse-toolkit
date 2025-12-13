import { merge } from 'es-toolkit';
import type { ICommitlintConfigOptions, TCommitlintConfig } from '../@types';
import { createEmojiParser } from '../parsers';
import { createNxScopesRule } from '../scopes';

const createBaseCommitlintConfig = async (options: ICommitlintConfigOptions = {}): Promise<TCommitlintConfig> => {
	const { nxScopes, emoji, rules: customRules } = options;

	const parserPreset = await createEmojiParser(emoji);

	const baseConfig: TCommitlintConfig = {
		extends: ['@commitlint/config-conventional'],
		parserPreset,
		prompt: {
			questions: {
				type: {
					emojiInHeader: emoji?.enabled ?? true,
				},
			},
		},
		rules: {
			'scope-enum': createNxScopesRule(nxScopes),
		},
	};

	if (customRules) return merge(baseConfig, { rules: customRules });

	return baseConfig;
};

export { createBaseCommitlintConfig };
