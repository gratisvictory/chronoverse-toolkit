export default {
	'*.{js,jsx,ts,tsx,cjs,mjs}': ['prettier -w --log-level=warn'],
	'*.{json,md,yml,yaml}': ['prettier -w --log-level=warn'],
	'*': () => [
		'yarn check-types',
		'yarn build',
		'yarn lint:ws',
	],
};
