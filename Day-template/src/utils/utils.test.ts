import { solution } from './utils';
import { readFileSync } from 'fs';

describe('examples/answers', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

    it('should return __ for the answer to the example for part one', () => {
        const data = readFileSync('src/utils/example-input.txt', 'utf-8');
        solution(data);
        expect(consoleSpy).toHaveBeenCalledWith('Answer 1: __');
    });
});
