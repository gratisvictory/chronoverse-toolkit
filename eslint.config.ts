import { getEslintIgnores } from '@chronoverse-toolkit/utils';
import { chronoverse } from '@chronoverse-toolkit/flat';
import { typescript } from '@chronoverse-toolkit/eslint-typescript';

export default chronoverse(getEslintIgnores(), typescript({ safe: false }));
