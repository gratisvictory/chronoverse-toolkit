interface IEmojiConfig {
	/**
	 * Whether to include emojis in commit headers
	 * @default true
	 */
	enabled?: boolean;

	/**
	 * Custom emoji mappings for commit types
	 * @default Uses conventional commit emojis
	 */
	customEmojis?: Record<string, string>;
}

export type { IEmojiConfig };
