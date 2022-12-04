import { readFile } from 'fs/promises';
import {
    getPriorityTotalOfBadlyOrganizedItems,
    getTotalBadgePrioritiesFromAllElves,
    parseInput,
} from './utils';

readFile('src/input.txt', 'utf-8').then((data) => {
    const rucksacks = parseInput(data);

    const totalPriorityValueOfBadlyOrganizedItems =
        getPriorityTotalOfBadlyOrganizedItems(rucksacks);
    console.log(`Answer 1 ${totalPriorityValueOfBadlyOrganizedItems}`);

    const badgeValueSumOfAllElves =
        getTotalBadgePrioritiesFromAllElves(rucksacks);
    console.log(`Answer 2: ${badgeValueSumOfAllElves}`);
});
