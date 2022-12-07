import { parseInput, solution, sortByTotalCaloriesDescending } from './utils';
import { readFileSync } from 'fs';

describe('examples', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    const data = readFileSync('src/utils/example-input.txt', 'utf-8');
    const result = solution(data);

    it('should return 24000 for part one', () => {
        expect(consoleSpy.mock.calls[0][0]).toEqual('Answer 1: 24000');
    });

    it('should return 45000 for part two', () => {
        expect(consoleSpy.mock.calls[1][0]).toEqual('Answer 2: 45000');
    });
});

describe('parseInput', () => {
    const data = readFileSync('src/utils/example-input.txt', 'utf-8');
    const result = parseInput(data);

    it('should split each group of food items into a single elf', () => {
        expect(result.length).toEqual(5);
    });

    it('should properly total the calorie count', () => {
        result.forEach((elf) => {
            const checkedTotal = elf.foodItems.reduce((acc, curr) => acc + curr, 0);
            expect(elf.totalCalories).toEqual(checkedTotal);
        });
    });
});

describe('sortByTotalCaloriesDescending', () => {
    const data = readFileSync('src/utils/example-input.txt', 'utf-8');
    const result = parseInput(data);

    it('should sort the elves by total calories descending', () => {
        const sortedResult = sortByTotalCaloriesDescending(result);
        expect(sortedResult[0].totalCalories).toBeGreaterThan(sortedResult[1].totalCalories);
        expect(sortedResult[1].totalCalories).toBeGreaterThan(sortedResult[2].totalCalories);
        expect(sortedResult[2].totalCalories).toBeGreaterThan(sortedResult[3].totalCalories);
        expect(sortedResult[3].totalCalories).toBeGreaterThan(sortedResult[4].totalCalories);
    });
});
