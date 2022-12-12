import { solution } from './utils/utils';
import { readFile } from 'fs/promises';

readFile('src/utils/example-input.txt', 'utf-8').then(solution);
