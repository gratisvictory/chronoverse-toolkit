import type { ICommitlintConfigOptions, TCommitlintConfig } from './@types';
import { createBaseCommitlintConfig } from './configs';

const commitlint = (options: ICommitlintConfigOptions = {}): Promise<TCommitlintConfig> =>
	createBaseCommitlintConfig(options);

export { commitlint };
