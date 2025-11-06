/** @type {import('prettier').Config} */
export default {
	plugins: [
		'prettier-plugin-packagejson',
		'prettier-plugin-sort-json',
		'prettier-plugin-multiline-arrays',
	],
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
	overrides: [
		{
			files: ['*.json', '*.jsonc', '*.json5'],
			options: {
				tabWidth: 2,
				useTabs: false,
			},
		},
	],
};
