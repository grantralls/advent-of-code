import { partOne } from './utils';
import { readFileSync } from 'fs';

describe('examples/answers', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

    it('should return 13 for the answer to the example for part one', () => {
        const data = readFileSync('src/utils/example-input.txt', 'utf-8');
        partOne(data);
        expect(consoleSpy).toHaveBeenCalledWith('Answer 1:', 13);
    });

    it('should return 5555 for the answer for part one', () => {
        const data = readFileSync('src/input.txt', 'utf-8');
        partOne(data);
        expect(consoleSpy).toHaveBeenCalledWith('Answer 1:', 5555);
    });
});
