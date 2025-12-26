import { getEslintIgnores } from '@chronoverse-toolkit/utils';
import { chronoverse } from '@chronoverse-toolkit/flat';
import { js } from '@chronoverse-toolkit/eslint-js';
import { ts } from '@chronoverse-toolkit/eslint-ts';

export default chronoverse(getEslintIgnores(), js(), ts({ disables: true, consistent: true }));
