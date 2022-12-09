import { readFile } from 'fs/promises';
import { solution } from './utils/utils';

readFile('src/utils/example-input.txt', 'utf-8').then(solution);
