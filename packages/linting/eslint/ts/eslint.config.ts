import { getEslintIgnores } from '@chronoverse-toolkit/utils';
import { chronoverse } from '@chronoverse-toolkit/flat';
import { ts } from './src/chronoverse';

export default chronoverse(getEslintIgnores(), ts({ safe: false }));
