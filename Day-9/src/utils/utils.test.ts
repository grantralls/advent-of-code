import { partOne, partTwo, solution } from './utils';
import { readFileSync } from 'fs';

describe('examples/answers', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

    it('should return 13 for the part one example', () => {
        const data = readFileSync('./src/utils/example-input.txt', 'utf8');
        partOne(data);

        expect(consoleSpy).toHaveBeenCalledWith('Answer 1:', 13);
    });

    it('should return 6406 for the part one answer', () => {
        const data = readFileSync('./src/input.txt', 'utf8');
        partOne(data);

        expect(consoleSpy).toHaveBeenCalledWith('Answer 1:', 6406);
    });

    it('should return 1 for the part two example', () => {
        const data = readFileSync('./src/utils/example-input.txt', 'utf8');
        partTwo(data);

        expect(consoleSpy).toHaveBeenCalledWith('Answer 2:', 1);
    });

    it('should return 36 for the part two example two', () => {
        const data = readFileSync('./src/utils/example-input-2.txt', 'utf8');
        partTwo(data);

        expect(consoleSpy).toHaveBeenCalledWith('Answer 2:', 36);
    });

    it('should return 2643 for the answer for part two', () => {
        const data = readFileSync('./src/input.txt', 'utf8');
        partTwo(data);

        expect(consoleSpy).toHaveBeenCalledWith('Answer 2:', 2643);
    });
});
