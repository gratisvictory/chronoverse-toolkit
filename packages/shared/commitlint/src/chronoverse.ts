import type { TCommitlintConfig } from './@types';
import { createBaseCommitlintConfig } from './configs';

const chronoverseCommitlint = (): Promise<TCommitlintConfig> =>
	createBaseCommitlintConfig({
		nxScopes: {
			customScopes: ['workspace'],
		},
		emoji: {
			enabled: true,
		},
	});

export { chronoverseCommitlint };
