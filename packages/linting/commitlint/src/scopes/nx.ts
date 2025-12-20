import { createProjectGraphAsync, type ProjectGraph } from '@nx/devkit';
import { isNil } from 'es-toolkit';
import type { INxProjectFilter, INxScopesConfig, TScopeEnumRule } from '../@types';

let projectGraphCache: ProjectGraph | null = null;

const getProjectGraph = async (): Promise<ProjectGraph> => {
	if (isNil(projectGraphCache)) {
		projectGraphCache = await createProjectGraphAsync();
	}
	return projectGraphCache;
};

const trimScopedPackageName = (name: string): string => {
	const isScopedPackage = name.startsWith('@');
	return isScopedPackage ? (name.split('/')[1] ?? name) : name;
};

const extractProjectNames = (nodes: ProjectGraph['nodes'], filter?: INxProjectFilter): string[] => {
	const entries = Object.entries(nodes);

	if (isNil(filter)) {
		return entries.map(([name]) => name);
	}

	return entries.filter(([name, config]) => filter({ ...config.data, name })).map(([name]) => name);
};

const applyTrimming = (names: string[], shouldTrim: boolean): Readonly<string[]> =>
	shouldTrim ? names.map(trimScopedPackageName) : names;

const getNxProjects = async (
	filter?: INxProjectFilter,
	trimProjectPrefix: boolean = true,
): Promise<Readonly<string[]>> => {
	try {
		const graph = await getProjectGraph();
		const projectNames = extractProjectNames(graph.nodes, filter);

		return applyTrimming(projectNames, trimProjectPrefix);
	} catch (error) {
		console.warn('Failed to read Nx workspace:', error);
		return [];
	}
};

const mergeScopes = (customScopes: Readonly<string[]>, nxProjects: Readonly<string[]>): string[] => [
	...customScopes,
	...nxProjects,
];

const createNxScopesRule =
	(config?: INxScopesConfig): TScopeEnumRule =>
	async () => {
		const { filter, trimProjectPrefix, customScopes = [] } = config ?? {};

		const nxProjects = await getNxProjects(filter, trimProjectPrefix);
		const allScopes = mergeScopes(customScopes, nxProjects);

		return [2, 'always', allScopes] as const;
	};

const clearProjectGraphCache = (): void => {
	projectGraphCache = null;
};

export { createNxScopesRule, clearProjectGraphCache, getNxProjects };
