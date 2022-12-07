import {
    getPrioritiesOfDuplicatesWithinRucksack,
    getPriorityTotalOfBadlyOrganizedItems,
    getPriorityOfFoodItem,
    getBadgePriorityFromElfGroup,
    parseInput,
    solution,
} from './utils';
import { readFileSync } from 'fs';

describe('examples', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    const data = readFileSync('src/utils/example-input.txt', 'utf-8');
    solution(data);

    it('should return 157 for the example input for part one', () => {
        expect(consoleSpy.mock.calls[0][0]).toEqual('Answer 1 157');
    });

    it('should return 70 for the example input for part two', () => {
        expect(consoleSpy.mock.calls[1][0]).toEqual('Answer 2: 70');
    });
});

describe('getPrioritiesOfDuplicatesWithinRucksack', () => {
    it('should return 0 if there are no duplicates between compartments (halves)', () => {
        const rucksack = 'aabb';
        const result = getPrioritiesOfDuplicatesWithinRucksack(rucksack);
        expect(result).toBe(0);
    });

    it('should return the total of priority scores if there is one duplicate between compartments (halves)', () => {
        const rucksack = 'abab';
        const result = getPrioritiesOfDuplicatesWithinRucksack(rucksack);
        expect(result).toBe(3);
    });
});

describe('getPriorityTotalOfBadlyOrganizedItems', () => {
    it('should return 0 if there are no duplicates in any rucksacks', () => {
        const rucksackList = ['aabb', 'bbaa'];
        const result = getPriorityTotalOfBadlyOrganizedItems(rucksackList);

        expect(result).toBe(0);
    });

    it('should return the priority scores of duplicated items', () => {
        const rucksackList = ['aaaabb', 'abab'];
        const result = getPriorityTotalOfBadlyOrganizedItems(rucksackList);

        expect(result).toBe(4);
    });
});

describe('getBadgePriorityFromElfGroup', () => {
    it('should return 0 if there are no duplicates in any rucksacks', () => {
        const elfGroup = ['bbbb', 'cccc', 'dddd'];
        const result = getBadgePriorityFromElfGroup(elfGroup);

        expect(result).toBe(0);
    });

    it('should return the priority scores of duplicated items', () => {
        const elfGroup = ['acc', 'add', 'aee'];
        const result = getBadgePriorityFromElfGroup(elfGroup);

        expect(result).toBe(1);
    });
});

describe('getPriorityOfFoodItem', () => {
    it('should return 1-26 for a-z', () => {
        const result1 = getPriorityOfFoodItem('a');
        const result2 = getPriorityOfFoodItem('z');

        expect(result1).toBe(1);
        expect(result2).toBe(26);
    });

    it('should return 27-52 for A-Z', () => {
        const result1 = getPriorityOfFoodItem('A');
        const result2 = getPriorityOfFoodItem('Z');

        expect(result1).toBe(27);
        expect(result2).toBe(52);
    });
});
