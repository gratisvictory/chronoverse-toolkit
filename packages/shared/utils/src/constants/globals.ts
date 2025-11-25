import type { Linter } from 'eslint';
import globals from 'globals';

const sharedGlobals: Linter.Globals = {
	...globals.browser,
	...globals.node,
	...globals.es2022,
	...globals.serviceworker,
	...globals.builtin,
	console: 'readonly',
	document: 'readonly',
	navigator: 'readonly',
	window: 'readonly',
	globalThis: 'readonly',
	fetch: 'readonly',
	structuredClone: 'readonly',
	queueMicrotask: 'readonly',
	setTimeout: 'readonly',
	clearTimeout: 'readonly',
	setInterval: 'readonly',
	clearInterval: 'readonly',
	AbortController: 'readonly',
	AbortSignal: 'readonly',
	TextEncoder: 'readonly',
	TextDecoder: 'readonly',
	URL: 'readonly',
	URLSearchParams: 'readonly',
	crypto: 'readonly',
};

export { sharedGlobals };
