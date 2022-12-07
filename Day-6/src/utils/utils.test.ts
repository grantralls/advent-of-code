import { getStartOfIndex } from './utils';

describe('Question 1', () => {
    describe('getStartOfIndex', () => {
        it('should return 0 for aaaaaaaaaaa', () => {
            const result = getStartOfIndex('aaaaaaaaaaa', 4);

            expect(result).toBe(0);
        });

        it('should return 5 for bvwbjplbgvbhsrlpgdmjqwftvncz', () => {
            const result = getStartOfIndex('bvwbjplbgvbhsrlpgdmjqwftvncz', 4);

            expect(result).toBe(5);
        });

        it('should return 6 for nppdvjthqldpwncqszvftbrmjlhg', () => {
            const result = getStartOfIndex('nppdvjthqldpwncqszvftbrmjlhg', 4);

            expect(result).toBe(6);
        });

        it('should return 10 for nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg', () => {
            const result = getStartOfIndex('nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg', 4);

            expect(result).toBe(10);
        });

        it('should return 11 for zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw', () => {
            const result = getStartOfIndex('zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw', 4);

            expect(result).toBe(11);
        });
    });
});
