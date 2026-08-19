import { createRequire } from 'node:module';
import { dts } from 'rollup-plugin-dts';
import { swc, defineRollupSwcOption } from 'rollup-plugin-swc3';

const require = createRequire(import.meta.url);
const pkg = require('./package.json');

export default [
	{
		input: 'src/Monome.js',
		output: [{ file: pkg.module, format: 'es' }],
		plugins: [swc()],
	},
	{
		input: 'src/Monome.js',
		output: [
			{ file: pkg.main, format: 'cjs', exports: 'named' },
			{ file: pkg.module.replace('js', 'min.js'), format: 'es' },
		],
		plugins: [swc(defineRollupSwcOption({ minify: true }))],
	},
	{
		input: 'src/umd.js', // separate entry for single default export umd build
		output: [
			{ name: 'Monome', file: pkg.browser, format: 'umd', exports: 'default' },
		],
		plugins: [swc(defineRollupSwcOption({ minify: true }))],
	},
	{
		input: 'src/Monome.js',
		output: [
			{ file: pkg.types, format: 'es' },
			{ file: pkg.types.replace(/\.d\.ts$/, '.d.cts'), format: 'es' },
		],
		plugins: [dts({ compilerOptions: { allowJs: true } })],
	},
];
