import { getScoreOfTreeInLayer, isVisibleInLayer, solution } from './utils';
import { readFileSync } from 'fs';

describe('examples/answers', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

    it('should find 21 for the answer to part one with example input', () => {
        const data = readFileSync('src/utils/example-input.txt', 'utf-8');
        solution(data);
        expect(consoleSpy).toHaveBeenCalledWith('Answer 1:', 21);
    });

    it('should find 8 for the answer to part two with example input', () => {
        const data = readFileSync('src/utils/example-input.txt', 'utf-8');
        solution(data);
        expect(consoleSpy).toHaveBeenCalledWith('Answer 2:', 8);
    });

    it('should find 1829 for the answer to part one with real input', () => {
        const data = readFileSync('src/input.txt', 'utf-8');
        solution(data);
        expect(consoleSpy).toHaveBeenCalledWith('Answer 1:', 1829);
    });

    it('should find 291840 for the answer to part two with real input', () => {
        const data = readFileSync('src/input.txt', 'utf-8');
        solution(data);
        expect(consoleSpy).toHaveBeenCalledWith('Answer 2:', 291840);
    });
});

describe('isVisibleInLayer', () => {
    it('should return true if the tree is the tallest in the layer', () => {
        expect(isVisibleInLayer(0, [0, 2, 3, 4])).toBe(true);
    });

    it('should return false if the tree is not the tallest in the layer', () => {
        expect(isVisibleInLayer(2, [3, 2, 3, 4, 5])).toBe(false);
    });
});

describe('getScoreOfTreeInLayer', () => {
    it('should return the score of the tree in the layer', () => {
        expect(getScoreOfTreeInLayer(2, [3, 2, 3, 4, 5])).toBe(2);
    });

    it('should return 0 if the tree is at an edge', () => {
        expect(getScoreOfTreeInLayer(0, [3, 2, 3, 4, 5])).toBe(0);
        expect(getScoreOfTreeInLayer(4, [3, 2, 3, 4, 5])).toBe(0);
    });
});
