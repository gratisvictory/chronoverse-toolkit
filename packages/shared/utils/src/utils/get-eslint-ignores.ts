import gitignore from 'eslint-config-flat-gitignore';
import { defineConfig, globalIgnores, type Config } from 'eslint/config';
import { EXCLUDE_PATTERNS } from '../constants';

const getEslintIgnores = (): Config[] =>
	defineConfig([
		gitignore({ name: '@chronoverse-eslint/gitignore' }),
		globalIgnores(EXCLUDE_PATTERNS, '@chronoverse-eslint/ignores'),
	]);

export { getEslintIgnores };
