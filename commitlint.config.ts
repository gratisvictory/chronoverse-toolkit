// import type { ParserPreset, UserConfig } from '@commitlint/types';
// import conventionalConfig from '@commitlint/config-conventional';
// // @ts-expect-error
// import nxConfig from '@commitlint/config-nx-scopes';
// // @ts-expect-error
// import createPreset from 'conventional-changelog-conventionalcommits';
// import { merge } from 'es-toolkit';

// const { getProjects } = nxConfig.utils;

// const createEmojiParser = async (): Promise<ParserPreset> => {
// 	const emojiRegexPart = Object.values(conventionalConfig.prompt.questions.type.enum)
// 		.map(v => v.emoji.trim())
// 		.join('|');

// 	const parserOpts = {
// 		headerPattern: new RegExp(`^(?:${emojiRegexPart})\\s+(\\w+)(?:\\(([^)]+)\\))?:\\s+(.*)$`),
// 		headerCorrespondence: ['type', 'scope', 'subject'],
// 	};

// 	const basePreset = await createPreset();

// 	return merge(merge({}, basePreset), {
// 		parserOpts,
// 		conventionalChangelog: { parserOpts },
// 		recommendedBumpOpts: { parserOpts },
// 	});
// };

// const emojiParser = await createEmojiParser();

// export default {
// 	extends: [
// 		'@commitlint/config-conventional',
// 		'@commitlint/config-nx-scopes',
// 	],

// 	parserPreset: emojiParser,

// 	prompt: {
// 		questions: {
// 			type: {
// 				emojiInHeader: true,
// 			},
// 		},
// 	},

// 	rules: {
// 		// @ts-expect-error
// 		'scope-enum': async ctx => [
// 			2,
// 			'always',
// 			[
// 				'workspace',
// 				...(await getProjects(ctx)),
// 			],
// 		],
// 	},
// } satisfies UserConfig;
import { chronoverseCommitlint } from '@chronoverse-toolkit/commitlint';

export default chronoverseCommitlint();
