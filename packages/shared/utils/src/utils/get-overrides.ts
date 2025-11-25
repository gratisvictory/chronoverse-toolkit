import type { Linter } from 'eslint';
import { resolveSubOptions } from './resolve-sub-options';

type TOverridesRecord = Partial<Linter.RulesRecord>;

const getOverrides = <
	TOptions extends Record<string, any>,
	TRuleOptions extends Record<string, any> = Record<string, any>,
	K extends keyof TOptions = keyof TOptions,
>(
	options: TOptions & {
		overrides?: Partial<Record<K, (TOverridesRecord & Partial<TRuleOptions>) | undefined>> | undefined;
	},
	key: K,
): TOverridesRecord & Partial<TRuleOptions> => {
	const sub = resolveSubOptions(options, key);
	return {
		...(options.overrides as any)?.[key],
		...('overrides' in sub ? sub.overrides : {}),
	} as TOverridesRecord & Partial<TRuleOptions>;
};

export { getOverrides };
export type { TOverridesRecord };
