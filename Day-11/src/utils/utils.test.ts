import { getModifier, getStartingItems, getTestCase, solution } from './utils';
import { readFileSync } from 'fs';
import { Monkey } from '../Monkey';

describe('examples/answers', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

    it('should return 10605 for the part one example', () => {
        const data = readFileSync('src/utils/example-input.txt', 'utf8');
        solution(data);

        expect(consoleSpy).toHaveBeenCalledWith('Answer 1:', 10605);
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
