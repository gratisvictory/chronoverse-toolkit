import { getEslintIgnores } from '@chronoverse-toolkit/utils';
import { chronoverse } from '@chronoverse-toolkit/flat';
import { typescript } from './src/chronoverse';

export default chronoverse(getEslintIgnores(), typescript({ safe: false }));
