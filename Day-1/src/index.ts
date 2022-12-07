import { readFile } from 'fs/promises';
import { solution } from './utils/utils';

readFile('src/input.txt', 'utf-8')
    .then(solution)
    .catch((err) => console.error(err));
