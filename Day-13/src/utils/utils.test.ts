import { partOne, partTwo } from './utils';
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

    it('should return 140 for the answer to the example for part two', () => {
        const data = readFileSync('src/utils/example-input.txt', 'utf-8');
        partTwo(data);
        expect(consoleSpy).toHaveBeenCalledWith('Answer 2:', 140);
    });

    it('should return 22852 for the answer to part two', () => {
        const data = readFileSync('src/input.txt', 'utf-8');
        partTwo(data);
        expect(consoleSpy).toHaveBeenCalledWith('Answer 2:', 22852);
    });
});
