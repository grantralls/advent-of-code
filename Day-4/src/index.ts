import { readFile } from 'fs/promises';
import { parseData, getTotalNumberOfPartialOverlaps, getTotalNumberOfTotalOverlaps } from './utils/utils';

readFile('src/input.txt', 'utf-8').then((data) => {
    const parsedAndSortedElves = parseData(data);
    const answerOne = getTotalNumberOfTotalOverlaps(parsedAndSortedElves);
    console.log('Answer One:', answerOne);

    const answerTwo = getTotalNumberOfPartialOverlaps(parsedAndSortedElves);
    console.log('Answer Two:', answerTwo);
});
