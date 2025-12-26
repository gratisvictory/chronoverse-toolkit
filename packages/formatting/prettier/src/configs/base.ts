import type { TPrettierConfig } from '../@types';

const createBaseConfig = (): TPrettierConfig => ({
	printWidth: 120,
	tabWidth: 4,
	useTabs: true,
	semi: true,
	singleQuote: true,
	jsxSingleQuote: true,
	trailingComma: 'all',
	quoteProps: 'as-needed',
	bracketSpacing: true,
	bracketSameLine: false,
	arrowParens: 'avoid',
	proseWrap: 'preserve',
	endOfLine: 'lf',
	multilineArraysWrapThreshold: 3,
});

export { createBaseConfig };
