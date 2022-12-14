import { Cave } from '../Cave';

export const solution = (data: string) => {
    partOne(data);
    partTwo(data);
};

export const partOne = (data: string) => {
    const cave = new Cave(data, true);
    console.log('Answer 1:', cave.numberOfGrainsUntilOverflow());
};

export const partTwo = (data: string) => {
    const cave = new Cave(data, false);
    const results = cave.numberOfGrainsUntilSourceCoverage();
    console.log('Answer 2:', results);
};
