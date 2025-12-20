import { merge } from 'es-toolkit';
import type { ICommitlintConfigOptions, TCommitlintConfig } from '../@types';
import { createEmojiParser, createEmojiEnum } from '../parsers';
import { createNxScopesRule } from '../scopes';

const createBaseCommitlintConfig = async (options: ICommitlintConfigOptions = {}): Promise<TCommitlintConfig> => {
	const { nxScopes, emoji, rules: customRules } = options;

	const parserPreset = await createEmojiParser(emoji);
	const emojiEnum = createEmojiEnum(emoji?.customEmojis);

	const baseConfig: TCommitlintConfig = {
		extends: ['@commitlint/config-conventional'],
		parserPreset,
		prompt: {
			questions: {
				type: {
					emojiInHeader: emoji?.enabled ?? true,
					enum: emojiEnum,
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
