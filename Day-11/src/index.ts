import { solution } from './utils/utils';
import { readFile } from 'fs/promises';

readFile('src/input.txt', 'utf8').then(solution);
