import { myChoiceMapper, opponentChoiceMapper, parseInput, solution } from './utils';
import { readFileSync } from 'fs';

describe('examples', () => {
    it('should return 15 for part one', () => {
        const consoleSpy = jest.spyOn(console, 'log');

        const data = readFileSync('src/utils/example-input.txt', 'utf-8');
        solution(data);

        expect(consoleSpy.mock.calls[0][0]).toEqual('Answer 1: 15');
    });

    it('should return 12 for part two', () => {
        const consoleSpy = jest.spyOn(console, 'log');

        const data = readFileSync('src/utils/example-input.txt', 'utf-8');
        solution(data);

        expect(consoleSpy.mock.calls[1][0]).toEqual('Answer 2: 12');
    });
});

describe('parseInput', () => {
    it('should return a string matrix where the sub array is an array of single characters and the first entry is the opponents choice', () => {
        const data = readFileSync('src/utils/example-input.txt', 'utf-8');
        const result = parseInput(data);
        expect(result).toEqual([
            ['A', 'Y'],
            ['B', 'X'],
            ['C', 'Z'],
        ]);
    });
});

describe('myChoiceMapper', () => {
    it('should have Rock win against Scissors', () => {
        expect((myChoiceMapper as any).X.winsAgainst.value).toEqual('Scissors');
    });
    it('should have Scissors win against Paper', () => {
        expect((myChoiceMapper as any).Z.winsAgainst.value).toEqual('Paper');
    });
    it('should have Paper win against Rock', () => {
        expect((myChoiceMapper as any).Y.winsAgainst.value).toEqual('Rock');
    });
});

describe('opponentChoiceMapper', () => {
    it('should have Rock win against Scissors', () => {
        expect((opponentChoiceMapper as any).A.winsAgainst.value).toEqual('Scissors');
    });
    it('should have Scissors win against Paper', () => {
        expect((opponentChoiceMapper as any).C.winsAgainst.value).toEqual('Paper');
    });
    it('should have Paper win against Rock', () => {
        expect((opponentChoiceMapper as any).B.winsAgainst.value).toEqual('Rock');
    });
});
