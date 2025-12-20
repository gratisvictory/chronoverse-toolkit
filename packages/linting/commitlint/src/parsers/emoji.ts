// @ts-expect-error
import createPreset from 'conventional-changelog-conventionalcommits';
import type { ParserPreset as IParserPreset } from '@commitlint/types';
import conventionalConfig from '@commitlint/config-conventional';
import { merge, isNotNil, isString, isPlainObject, mapValues } from 'es-toolkit';
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

const hasKeys = (obj: Record<string, unknown>): boolean => Object.keys(obj).length > 0;

const hasEmojiProperty = (value: unknown): value is { emoji: string } =>
	isPlainObject(value) && 'emoji' in value && isString(value['emoji']);

const escapeRegex = (str: string): string => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const extractEmojisFromConfig = (): Record<string, string> => {
	const typeEnum = conventionalConfig.prompt?.questions?.type?.enum ?? {};

	return Object.entries(typeEnum).reduce<Record<string, string>>((acc, [key, value]) => {
		if (hasEmojiProperty(value)) {
			acc[key] = value.emoji.trim();
		}
		return acc;
	}, {});
};

const getEmojiMappings = (customEmojis?: Record<string, string>): Record<string, string> => {
	if (isNotNil(customEmojis)) {
		return { ...DEFAULT_EMOJIS, ...customEmojis };
	}

	try {
		const configEmojis = extractEmojisFromConfig();
		return hasKeys(configEmojis) ? configEmojis : DEFAULT_EMOJIS;
	} catch {
		return DEFAULT_EMOJIS;
	}
};

const createEmojiPattern = (emojis: Record<string, string>): RegExp => {
	const emojiRegexPart = Object.values(emojis).map(escapeRegex).join('|');

	// Pattern: emoji + space + type + optional(scope) + colon + space + subject
	// Example: ✨ feat(scope): subject
	return new RegExp(`^(?:${emojiRegexPart})\\s+(\\w+)(?:\\(([^)]+)\\))?:\\s+(.*)$`);
};

const createEmojiParser = async (config?: IEmojiConfig): Promise<IParserPreset> => {
	const { enabled = true, customEmojis } = config ?? {};

	if (!enabled) {
		return createPreset();
	}

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

const createEmojiEnum = (customEmojis?: Record<string, string>): Record<string, { emoji: string }> => {
	const emojis = getEmojiMappings(customEmojis);
	return mapValues(emojis, emoji => ({ emoji }));
};

export { createEmojiParser, getEmojiForType, getEmojiMappings, createEmojiEnum };
