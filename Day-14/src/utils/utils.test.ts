import { partOne, partTwo } from './utils';
import { readFileSync } from 'fs';

describe('examples/answers', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

    it('should return 24 for the answer to the example for part one', () => {
        const data = readFileSync('src/utils/example-input.txt', 'utf-8');
        partOne(data);
        expect(consoleSpy).toHaveBeenCalledWith('Answer 1:', 24);
    });

    it('should return 994 for the answer to part one', () => {
        const data = readFileSync('src/input.txt', 'utf-8');
        partOne(data);
        expect(consoleSpy).toHaveBeenCalledWith('Answer 1:', 994);
    });

    it('should return 93 for the answer to the example for part two', () => {
        const data = readFileSync('src/utils/example-input.txt', 'utf-8');
        partTwo(data);
        expect(consoleSpy).toHaveBeenCalledWith('Answer 2:', 93);
    });

    it('should return 26283 for the answer to part two', () => {
        const data = readFileSync('src/input.txt', 'utf-8');
        partTwo(data);
        expect(consoleSpy).toHaveBeenCalledWith('Answer 2:', 26283);
    });
});
