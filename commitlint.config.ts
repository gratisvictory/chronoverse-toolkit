import { commitlint } from '@chronoverse-toolkit/commitlint';

export default commitlint({
	nxScopes: {
		customScopes: ['workspace'],
		trimProjectPrefix: true,
	},
	emoji: {
		enabled: true,
	},
});
