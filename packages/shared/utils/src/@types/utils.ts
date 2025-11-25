type TFilterByPrefix<TRecord extends Record<string, any>, TPrefix extends string> = {
	[K in keyof TRecord as K extends `${TPrefix}${string}` ? K : never]: TRecord[K];
};

type TExtractPrefix<
	TStr extends string,
	TDelimiter extends string = '/',
> = TStr extends `${infer Prefix}${TDelimiter}${string}` ? `${Prefix}${TDelimiter}` : never;

type TGetPrefixes<TRecord extends Record<string, any>> = {
	[K in keyof TRecord]: TExtractPrefix<K extends string ? K : never>;
}[keyof TRecord];

export type { TFilterByPrefix, TExtractPrefix, TGetPrefixes };
