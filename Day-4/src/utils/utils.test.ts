import { readFileSync } from 'fs';
import { getTotalNumberOfTotalOverlaps, getTotalNumberOfPartialOverlaps, parseData } from './utils';

describe('examples', () => {
    it('should retun 2 for the example data for total overlaps', () => {
        const data = readFileSync('src/utils/test-input.txt', 'utf-8');
        const result = parseData(data);

        expect(getTotalNumberOfTotalOverlaps(result)).toEqual(2);
    });

    it('should retun 4 for the example data for partial overlaps', () => {
        const data = readFileSync('src/utils/test-input.txt', 'utf-8');
        const result = parseData(data);

        expect(getTotalNumberOfPartialOverlaps(result)).toEqual(4);
    });
});

describe('parseData', () => {
    it('should return an array of elf groups', () => {
        const data = readFileSync('src/utils/test-input.txt', 'utf-8');
        const result = parseData(data);

        expect(result.slice(0, 2)).toEqual([
            [
                { min: 2, max: 4, delta: 2 },
                { min: 6, max: 8, delta: 2 },
            ],
            [
                { min: 2, max: 3, delta: 1 },
                { min: 4, max: 5, delta: 1 },
            ],
        ]);
    });

    it('should order elves with the largest delta first', () => {
        const data = readFileSync('src/utils/test-input.txt', 'utf-8');
        const result = parseData(data);

        expect(result.slice(3, 4)).toEqual([
            [
                { min: 2, max: 8, delta: 6 },
                { min: 3, max: 7, delta: 4 },
            ],
        ]);
        expect(result.slice(3, 4)).not.toEqual([
            [
                { min: 3, max: 7, delta: 4 },
                { min: 2, max: 8, delta: 6 },
            ],
        ]);
    });
});

describe('getTotalNumberOfTotalOverlaps', () => {
    it('should return 0 when there is no total overlaps', () => {
        const data = [
            [
                {
                    min: 1,
                    max: 2,
                },
                {
                    min: 3,
                    max: 4,
                },
            ],
        ];

        const result = getTotalNumberOfTotalOverlaps(data);

        expect(result).toEqual(0);
    });

    it('should return 1 when there is one total overlap', () => {
        const data = [
            [
                {
                    min: 1,
                    max: 4,
                },
                {
                    min: 2,
                    max: 3,
                },
            ],
        ];

        const result = getTotalNumberOfTotalOverlaps(data);

        expect(result).toEqual(1);
    });
});

describe('getTotalNumberOfPartialOverlaps', () => {
    it('should return 0 when there is no partial overlaps', () => {
        const data = [
            [
                {
                    min: 1,
                    max: 2,
                },
                {
                    min: 3,
                    max: 4,
                },
            ],
        ];

        const result = getTotalNumberOfPartialOverlaps(data);

        expect(result).toEqual(0);
    });

    it('should return 1 when there is one partial overlap', () => {
        const data = [
            [
                {
                    min: 1,
                    max: 4,
                },
                {
                    min: 4,
                    max: 5,
                },
            ],
        ];

        const result = getTotalNumberOfPartialOverlaps(data);

        expect(result).toEqual(1);
    });
});
