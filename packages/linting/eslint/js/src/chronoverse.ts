import { composer, type IComposer, type TResolvableConfig } from '@chronoverse-toolkit/flat';
import { getOverrides, type Awaitable } from '@chronoverse-toolkit/utils';

import { bestPracticeGroups, errorsGroups, variablesGroups } from './groups';
import type { IOptionsConfig, TFlatConfigItem, TBestPracticeRules, TErrorsRules, TVariablesRules } from './types';
import { jsSetup } from './setup';

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

const js = (options: TConfigOptions = {}, ...userConfigs: Awaitable<TUserConfig>[]): IComposer<TFlatConfigItem> => {
	const { bestPractice = true, errors, variables } = options;

	const baseConfigs: TResolvableConfig<TFlatConfigItem>[] = [jsSetup()];

	if (bestPractice) {
		const bestPracticeConfig = bestPracticeGroups({
			overrides: getOverrides<IOptionsConfig, TBestPracticeRules>(options, 'bestPractice'),
		});

		baseConfigs.push(bestPracticeConfig);
	}

	if (errors) {
		const errorsConfig = errorsGroups({
			overrides: getOverrides<IOptionsConfig, TErrorsRules>(options, 'errors'),
		});

		baseConfigs.push(errorsConfig);
	}

	if (variables) {
		const variablesConfig = variablesGroups({
			overrides: getOverrides<IOptionsConfig, TVariablesRules>(options, 'variables'),
		});

		baseConfigs.push(variablesConfig);
	}

	const resolvedUserConfigs = resolveUserConfigs(userConfigs);

	return composer<TFlatConfigItem>(...baseConfigs, ...resolvedUserConfigs);
};

export { js };
