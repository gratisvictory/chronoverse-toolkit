import fs from 'node:fs/promises';
import { flatConfigsToRulesDTS } from 'eslint-typegen/core';
import { typescript } from '../src/chronoverse';

const generateTypegen = async () => {
	console.log('🔧 Generating typegen...');

	const composer = typescript({
		consistent: true,
		safe: true,
	});

	const configs = await composer;

	console.log(`📋 Total configs: ${configs.length}`);

	const allConfigs = configs;

	let dts = await flatConfigsToRulesDTS(allConfigs, {
		includeAugmentation: false,
		exportTypeName: 'TRuleOptions',
	});

	const configNames = [
		...new Set(allConfigs.map(config => config.name).filter((name): name is string => Boolean(name))),
	];

	dts += `
export type TConfigNames = ${configNames.map(n => `'${n}'`).join(' | ')};
`;

	await fs.writeFile('typegen.d.ts', dts);

	console.log('✅ Typegen created: typegen.d.ts');
	console.log(`📦 Generated ${configNames.length} config names:`);
	configNames.forEach(name => console.log(`   - ${name}`));
};

generateTypegen().catch(console.error);
