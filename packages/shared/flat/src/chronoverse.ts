import type { TEslintConfig, TResolvableConfig, TChronoverse, TChronoverseCallback, IComposer } from './@types';
import { composer } from './composer';

type TChronoverseInput<T extends TEslintConfig = TEslintConfig> = TResolvableConfig<T> | IComposer<T>;

const chronoverse = <T extends TEslintConfig = TEslintConfig>(
	...args: TChronoverseInput<T>[] | [TChronoverseCallback<T>]
): TChronoverse<T> => {
	if (args.length === 1 && typeof args[0] === 'function') {
		const callback = args[0] as TChronoverseCallback<T>;
		const composerFn = (...configs: TChronoverseInput<T>[]) => {
			const resolved = resolveComposers(configs);
			return composer<T>(...resolved);
		};
		return callback(composerFn) as TChronoverse<T>;
	}

	const resolved = resolveComposers(args as TChronoverseInput<T>[]);
	return composer<T>(...resolved) as TChronoverse<T>;
};

const resolveComposers = <T extends TEslintConfig = TEslintConfig>(
	inputs: TChronoverseInput<T>[],
): TResolvableConfig<T>[] =>
	inputs.map(input => {
		if (input && typeof input === 'object' && 'toConfigs' in input) {
			return (input as IComposer<T>).toConfigs();
		}
		return input as TResolvableConfig<T>;
	});

export { chronoverse };
