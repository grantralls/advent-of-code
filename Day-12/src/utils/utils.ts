import { Graph } from '../Graph';

export const solution = (data: string) => {
    partOne(data);
    partTwo(data);
};

export const partOne = (data: string) => {
    const graph = new Graph(data.split('\n').map((line) => line.split('')));
};

export const partTwo = (data: string) => {
    console.log('Answer 2: __');
};
