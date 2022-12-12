import { getModifier, getStartingItems, getTestCase, parseInput, partOne, partTwo } from './utils';
import { readFileSync } from 'fs';
import { Monkey } from '../Monkey';

describe('examples/answers', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

    it('should return 10605 for the part one example', () => {
        const data = readFileSync('src/utils/example-input.txt', 'utf8');
        partOne(data);

        expect(consoleSpy).toHaveBeenCalledWith('Answer 1:', 10605);
    });

    it('should return 55458 for the part one answer', () => {
        const data = readFileSync('src/input.txt', 'utf8');
        partOne(data);

        expect(consoleSpy).toHaveBeenCalledWith('Answer 1:', 55458);
    });

    it('should return 2713310158 for the part two example', () => {
        const data = readFileSync('src/utils/example-input.txt', 'utf8');
        partTwo(data);

        expect(consoleSpy).toHaveBeenCalledWith('Answer 2:', 2713310158);
    });

    it('should return 14508081294 for the part two answer', () => {
        const data = readFileSync('src/input.txt', 'utf8');
        partTwo(data);

        expect(consoleSpy).toHaveBeenCalledWith('Answer 2:', 14508081294);
    });
});

describe('parseInput', () => {
    it('should return 4 monkeys', () => {
        const data = readFileSync('src/utils/example-input.txt', 'utf8');
        const monkeys = parseInput(data, true);

        expect(monkeys.length).toEqual(4);
    });
});

describe('getStartingItems', () => {
    it('should return an array [79, 39] when given "Starting items: 79, 39"', () => {
        const data = 'Starting items: 79, 39';

        expect(getStartingItems(data)[0].getWorryLevel()).toEqual(79);
        expect(getStartingItems(data)[1].getWorryLevel()).toEqual(39);
    });
    it('should return an array [5] when given "Starting items: 5"', () => {
        const data = 'Starting items: 5';

        expect(getStartingItems(data)[0].getWorryLevel()).toEqual(5);
    });
});

describe('getModifier', () => {
    it('should return a function that adds 6 to a number when given Operation: new = old + 6', () => {
        const data = 'Operation: new = old + 6';
        const functionReceived = getModifier(data);

        expect(functionReceived(4)).toEqual(10);
    });
});

describe('getTestCase', () => {
    const data = ['Test: divisible by 23', 'If true: throw to monkey 1', 'If false: throw to monkey 2'];
    const monkeys = [new Monkey(true), new Monkey(true), new Monkey(true)];

    it('should return a function that returns Monkey 1 when the number is even', () => {
        const testFunction = getTestCase(data, monkeys).testFunction;

        expect(JSON.stringify(testFunction(2))).toEqual(JSON.stringify(monkeys[1]));
    });

    it('should return a function that returns Monkey 2 when the number is even', () => {
        const testFunction = getTestCase(data, monkeys).testFunction;

        expect(JSON.stringify(testFunction(3))).toEqual(JSON.stringify(monkeys[2]));
    });
});
