import { solution } from './utils/utils';
import { readFile } from 'fs/promises';

readFile('src/utils/example-input.txt', 'utf8').then(solution);
