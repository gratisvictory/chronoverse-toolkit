import config from '@commitlint/config-nx-scopes';

const { getProjects } = config.utils;

export default {
	extends: [
		'@commitlint/config-conventional',
		'@commitlint/config-nx-scopes',
	],
	rules: {
		'scope-enum': async ctx => [
			2,
			'always',
			[
				'workspace',
				...(await getProjects(ctx)),
			],
		],
	},
};
