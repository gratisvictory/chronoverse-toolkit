import { createProjectGraphAsync, type ProjectGraph as IProjectGraph } from '@nx/devkit';
import type { INxProjectFilter, INxScopesConfig, TScopeEnumRule } from '../@types';

let projectGraphCache: IProjectGraph | null = null;

const getProjectGraph = async (): Promise<IProjectGraph> => {
	if (!projectGraphCache) {
		projectGraphCache = await createProjectGraphAsync();
	}
	return projectGraphCache;
};

const getNxProjects = async (filter?: INxProjectFilter): Promise<readonly string[]> => {
	try {
		const graph = await getProjectGraph();
		const projects = Object.entries(graph.nodes);

		if (!filter) {
			return projects.map(([name]) => name);
		}

		return projects.filter(([name, config]) => filter({ ...config.data, name })).map(([name]) => name);
	} catch (error) {
		console.warn('Failed to read Nx workspace:', error);
		return [];
	}
};

const createNxScopesRule =
	(config?: INxScopesConfig): TScopeEnumRule =>
	async () => {
		const { filter, customScopes = ['workspace'] } = config ?? {};

		const nxProjects = await getNxProjects(filter);
		const allScopes = [...customScopes, ...nxProjects];

		return [2, 'always', allScopes] as const;
	};

const clearProjectGraphCache = (): void => {
	projectGraphCache = null;
};

export { createNxScopesRule, clearProjectGraphCache };
