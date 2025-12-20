import { type IComposer, type TResolvableConfig, composer, type Awaitable } from '@chronoverse-toolkit/flat';
import { consistentGroups, safeGroups } from './groups';
import type { IOptionsConfig, TFlatConfigItem, TConsistentRules, TSafeRules } from './types';
import { typescriptSetup } from './setup';
import { getOverrides } from '@chronoverse-toolkit/utils';

type TUserConfig = TFlatConfigItem | TFlatConfigItem[] | IComposer<TFlatConfigItem>;

type TConfigOptions = IOptionsConfig & Omit<TFlatConfigItem, 'files'>;

const typescript = (
	options: TConfigOptions = {},
	...userConfigs: Awaitable<TUserConfig>[]
): IComposer<TFlatConfigItem> => {
	const { consistent = true, safe = true } = options;

	const baseConfigs: TResolvableConfig<TFlatConfigItem>[] = [typescriptSetup()];

	if (consistent) {
		const bestPracticeConfig = consistentGroups({
			overrides: getOverrides<IOptionsConfig, TConsistentRules>(options, 'consistent'),
		});

		baseConfigs.push(bestPracticeConfig);
	}

	if (safe) {
		const safeConfig = safeGroups({
			overrides: getOverrides<IOptionsConfig, TSafeRules>(options, 'safe'),
		});

		baseConfigs.push(safeConfig);
	}

	const resolvedUserConfigs: TResolvableConfig<TFlatConfigItem>[] = userConfigs.map(async config => {
		const resolved = await config;
		if (resolved && typeof resolved === 'object' && 'toConfigs' in resolved) {
			const composerInstance = resolved as IComposer<TFlatConfigItem>;
			return await composerInstance.toConfigs();
		}
		return resolved as TFlatConfigItem | TFlatConfigItem[];
	});

	return composer<TFlatConfigItem>(...baseConfigs, ...resolvedUserConfigs);
};

export { typescript };
