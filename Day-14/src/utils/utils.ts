import { Cave } from '../Cave';

export const solution = (data: string) => {
    partOne(data);
    partTwo(data);
};

export const partOne = (data: string) => {
    const cave = new Cave(data);
    console.log('Answer 1:', cave.numberOfGrainsUntilOverflow());
    cave.printCave();
};

export const partTwo = (data: string) => {
    console.log('Answer 2: __');
};
