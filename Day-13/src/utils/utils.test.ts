import { getPacketValue, solution } from './utils';
import { readFileSync } from 'fs';

// describe('examples/answers', () => {
//     const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

//     it('should return __ for the answer to the example for part one', () => {
//         const data = readFileSync('src/utils/example-input.txt', 'utf-8');
//         solution(data);
//         expect(consoleSpy).toHaveBeenCalledWith('Answer 1: __');
//     });
// });

describe('getPacketValue', () => {
    it('should return 1 when given [1, 2, 3]', () => {
        expect(getPacketValue([1, 2, 3], 0)).toEqual(1);
    });

    it('should return 3 when given [[[3]], 2, 1]', () => {
        expect(getPacketValue([[[3]], 2, 1], 0)).toEqual(3);
    });
});
