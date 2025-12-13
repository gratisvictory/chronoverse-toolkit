import { defineConfig } from 'tsdown';
import { promises as fsPromises } from 'node:fs';
import path from 'node:path';
import { glob } from 'glob';

export default defineConfig({
	entry: 'src/index.ts',
	platform: 'node',
	clean: true,
	dts: true,
	target: 'esnext',
	format: 'esm',
	outDir: 'dist',
	sourcemap: true,
	tsconfig: 'tsconfig.lib.json',
	hooks: {
		'build:done': async () => {
			console.log('🔍 Moving declaration files...');

			const outDir = 'dist';
			const typesDir = path.join(outDir, '@types');

			await fsPromises.mkdir(typesDir, { recursive: true });

			const dtsFiles = await glob('dist/**/*.d.mts?(.map)', {
				ignore: 'dist/@types/**',
				absolute: true,
			});

			console.log(`📄 Found ${dtsFiles.length} declaration files`);

			for (const dtsFile of dtsFiles) {
				const relativePath = path.relative('dist', dtsFile);
				const newPath = path.join(typesDir, relativePath);
				const newDir = path.dirname(newPath);

				await fsPromises.mkdir(newDir, { recursive: true });
				await fsPromises.rename(dtsFile, newPath);

				const shortPath = path.relative(process.cwd(), newPath);
				console.log(`✅ Moved ${shortPath}`);
			}

			console.log('✨ Declaration files moved successfully!');
		},
	},
});
