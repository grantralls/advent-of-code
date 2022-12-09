import { Rope } from './Rope';

export const solution = (data: string) => {
    partOne(data);

    partTwo(data);
};

export const partOne = (data: string) => {
    const rope = new Rope(data.split('\n'), 2);
    rope.executeInstructions();
    console.log('Answer 1:', rope.numberOfLocationsVisitedByTail());
};

export const partTwo = (data: string) => {
    const newRope = new Rope(data.split('\n'), 10);
    newRope.executeInstructions();
    console.log('Answer 2:', newRope.numberOfLocationsVisitedByTail());
};
