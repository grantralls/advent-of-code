import { partOne, partTwo } from './utils';
import { readFileSync } from 'fs';

describe('examples/answers', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

    it('should return 31 for the answer to the example for part one', () => {
        const data = readFileSync('src/utils/example-input.txt', 'utf-8');
        partOne(data);
        expect(consoleSpy).toHaveBeenCalledWith('Answer 1:', 31);
    });

    it('should return 361 for the answer for part one', () => {
        const data = readFileSync('src/input.txt', 'utf-8');
        partOne(data);
        expect(consoleSpy).toHaveBeenCalledWith('Answer 1:', 361);
    });

    it('should return 29 for the answer to the example for part two', () => {
        const data = readFileSync('src/utils/example-input.txt', 'utf-8');
        partTwo(data);
        expect(consoleSpy).toHaveBeenCalledWith('Answer 2:', 29);
    });

    it('should return 354 for the answer to part two', () => {
        const data = readFileSync('src/input.txt', 'utf-8');
        partTwo(data);
        expect(consoleSpy).toHaveBeenCalledWith('Answer 2:', 354);
    });
});
