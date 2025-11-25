type TResolvedOptions<T> = T extends boolean ? never : NonNullable<T>;

const resolveSubOptions = <T extends Record<string, any>, K extends keyof T>(
	options: T,
	key: K,
): TResolvedOptions<T[K]> => (typeof options[key] === 'boolean' ? ({} as any) : options[key] || ({} as any));

export { resolveSubOptions };
export type { TResolvedOptions };
