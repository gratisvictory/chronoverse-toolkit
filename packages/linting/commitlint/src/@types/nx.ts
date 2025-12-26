import type { ProjectConfiguration } from '@nx/devkit';

interface INxProjectFilter {
	/**
	 * Filter function to determine which projects should be included as valid scopes
	 * @param project - The Nx project configuration with name
	 * @returns true if the project should be included as a valid scope
	 */
	(project: ProjectConfiguration & { name: string }): boolean;
}

interface INxScopesConfig {
	/**
	 * Optional filter to select which projects are valid scopes
	 */
	filter?: INxProjectFilter;

	/**
	 * Additional custom scopes to include beyond Nx project names
	 * @default ['workspace']
	 */
	customScopes?: Readonly<string[]>;

	/**
	 * Trim scoped package prefix from project names
	 * If true, transforms "@scope/package-name" to "package-name"
	 * @default false
	 * @example
	 * // With trimProjectPrefix: true
	 * "@chronoverse-toolkit/commitlint" → "commitlint"
	 * "commitlint" → "commitlint"
	 */
	trimProjectPrefix?: boolean;
}

export type { INxProjectFilter, INxScopesConfig };
