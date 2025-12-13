// @ts-expect-error
import createPreset from 'conventional-changelog-conventionalcommits';
import type { ParserPreset as IParserPreset } from '@commitlint/types';
import conventionalConfig from '@commitlint/config-conventional';
import { merge } from 'es-toolkit';
import type { IEmojiConfig } from '../@types';

const DEFAULT_EMOJIS: Record<string, string> = {
	feat: '✨',
	fix: '🐛',
	docs: '📚',
	style: '💎',
	refactor: '♻️',
	perf: '🚀',
	test: '🧪',
	build: '🏗️',
	ci: '👷',
	chore: '🔧',
	revert: '⏪',
} as const;

const getEmojiMappings = (customEmojis?: Record<string, string>): Record<string, string> => {
	if (customEmojis) return { ...DEFAULT_EMOJIS, ...customEmojis };

	try {
		const configEmojis = Object.entries(conventionalConfig.prompt?.questions?.type?.enum ?? {}).reduce<
			Record<string, string>
		>((acc, [key, value]) => {
			if (value && typeof value === 'object' && 'emoji' in value && typeof value.emoji === 'string') {
				acc[key] = value.emoji.trim();
			}
			return acc;
		}, {});

		return Object.keys(configEmojis).length > 0 ? configEmojis : DEFAULT_EMOJIS;
	} catch {
		return DEFAULT_EMOJIS;
	}
};

const createEmojiPattern = (emojis: Record<string, string>): RegExp => {
	const emojiRegexPart = Object.values(emojis)
		.map(emoji => emoji.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
		.join('|');

	// Pattern: emoji + space + type + optional(scope) + colon + space + subject
	// Example: ✨ feat(scope): subject
	return new RegExp(`^(?:${emojiRegexPart})\\s+(\\w+)(?:\\(([^)]+)\\))?:\\s+(.*)$`);
};

const createEmojiParser = async (config?: IEmojiConfig): Promise<IParserPreset> => {
	const { enabled = true, customEmojis } = config ?? {};

	if (!enabled) return createPreset();

	const emojiMappings = getEmojiMappings(customEmojis);
	const headerPattern = createEmojiPattern(emojiMappings);

	const parserOpts = {
		headerPattern,
		headerCorrespondence: ['type', 'scope', 'subject'],
	};

	const basePreset = await createPreset();

	return merge(basePreset, {
		parserOpts,
		conventionalChangelog: { parserOpts },
		recommendedBumpOpts: { parserOpts },
	}) as IParserPreset;
};

const getEmojiForType = (type: string, customEmojis?: Record<string, string>): string => {
	const emojis = getEmojiMappings(customEmojis);
	return emojis[type] ?? '';
};

export { createEmojiParser, getEmojiForType };
