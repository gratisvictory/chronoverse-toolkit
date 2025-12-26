import { defineConfig } from 'tsdown';

export default defineConfig({
	entry: 'src/index.ts',
	platform: 'node',
	clean: true,
	dts: true,
	target: 'esnext',
	format: 'esm',
	outDir: 'dist',
	sourcemap: false,
	tsconfig: 'tsconfig.lib.json',
});
