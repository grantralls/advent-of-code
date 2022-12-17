import { partTwo, partOne } from './utils';
import { readFileSync } from 'fs';

describe('examples/answers', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

    it('should return 26 for the answer for the example for part one', () => {
        const data = readFileSync('src/utils/example-input.txt', 'utf-8');
        partOne(data);
        expect(consoleSpy).toHaveBeenCalledWith('Answer 1:', 26);
    });

    it('should return 6425133 for the answer to part one', () => {
        const data = readFileSync('src/utils/example-input.txt', 'utf-8');
        partOne(data);
        expect(consoleSpy).toHaveBeenCalledWith('Answer 1:', 26);
    });

    it('should return 10996191429555 for the answer to part two', () => {
        const data = readFileSync('src/input.txt', 'utf-8');
        partTwo(data);
        expect(consoleSpy).toHaveBeenCalledWith('Answer 2:', 10996191429555);
    });
});
