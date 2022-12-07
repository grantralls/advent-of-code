import { readFile } from 'fs/promises';
import { parseInput, crateMover, getCratesAtTopOfStack } from './utils/utils';

readFile('src/input.txt', 'utf-8').then((data) => {
    const parseData1 = parseInput(data);

    const firstFinalShip = crateMover(parseData1, true);
    const cratesAtTopOfStack1 = getCratesAtTopOfStack(firstFinalShip);
    console.log(`Answer 1: ${cratesAtTopOfStack1}`);

    const parseData2 = parseInput(data);

    const secondFinalShip = crateMover(parseData2, false);
    const cratesAtTopOfStack2 = getCratesAtTopOfStack(secondFinalShip);
    console.log(`Answer 2: ${cratesAtTopOfStack2}`);
});
