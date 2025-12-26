import { type IComposer, type TResolvableConfig, composer, type Awaitable } from '@chronoverse-toolkit/flat';
import { consistentGroups, disablesGroups, safeGroups } from './groups';
import type { IOptionsConfig, TFlatConfigItem, TConsistentRules, TSafeRules, TDisablesRules } from './types';
import { tsSetup } from './setup';
import { getOverrides } from '@chronoverse-toolkit/utils';

type TUserConfig = TFlatConfigItem | TFlatConfigItem[] | IComposer<TFlatConfigItem>;

type TConfigOptions = IOptionsConfig & Omit<TFlatConfigItem, 'files'>;

const resolveUserConfigs = (userConfigs: Awaitable<TUserConfig>[]): TResolvableConfig<TFlatConfigItem>[] => {
	return userConfigs.map(async config => {
		const resolved = await config;
		if (resolved && typeof resolved === 'object' && 'toConfigs' in resolved) {
			const composerInstance = resolved as IComposer<TFlatConfigItem>;
			return await composerInstance.toConfigs();
		}
		return resolved as TFlatConfigItem | TFlatConfigItem[];
	});
};

const ts = (options: TConfigOptions = {}, ...userConfigs: Awaitable<TUserConfig>[]): IComposer<TFlatConfigItem> => {
	const { consistent, safe, tsProjectService, tsProject, tsconfigRootDir, disables } = options;

	const baseConfigs: TResolvableConfig<TFlatConfigItem>[] = [
		tsSetup({
			tsProjectService,
			tsProject,
			tsconfigRootDir,
		}),
	];

	if (consistent) {
		const consistentConfig = consistentGroups({
			overrides: getOverrides<IOptionsConfig, TConsistentRules>(options, 'consistent'),
		});

		baseConfigs.push(consistentConfig);
	}

	if (safe) {
		const safeConfig = safeGroups({
			overrides: getOverrides<IOptionsConfig, TSafeRules>(options, 'safe'),
		});

		baseConfigs.push(safeConfig);
	}

	if (disables) {
		const disablesConfig = disablesGroups({
			overrides: getOverrides<IOptionsConfig, TDisablesRules>(options, 'disables'),
		});

		baseConfigs.push(disablesConfig);
	}

	const resolvedUserConfigs = resolveUserConfigs(userConfigs);

	return composer<TFlatConfigItem>(...baseConfigs, ...resolvedUserConfigs);
};

export { ts };
