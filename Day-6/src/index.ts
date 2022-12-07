import { readFile } from 'fs/promises';
import { getStartOfIndex } from './utils/utils';

readFile('src/input.txt', 'utf-8').then((datastream) => {
    const answerOne = getStartOfIndex(datastream, 4);
    console.log(`Answer one: ${answerOne}`);

    const answerTwo = getStartOfIndex(datastream, 14);
    console.log(`Answer two: ${answerTwo}`);
});
