import { solution } from './utils';
import { readFileSync } from 'fs';

// Part two is hard to test due to the output being a printed array, so I skipped it.

describe('examples/answer', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

    it('should return 13140 for the answer to the example for part one', () => {
        const data = readFileSync('src/utils/example-input-2.txt', 'utf-8');
        solution(data);

        expect(consoleSpy).toHaveBeenCalledWith('Answer 1:', 13140);
    });

    it('should return 13860 for the answer for part one', () => {
        const data = readFileSync('src/input.txt', 'utf-8');
        solution(data);

        expect(consoleSpy).toHaveBeenCalledWith('Answer 1:', 13860);
    });
});
