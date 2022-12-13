import { Graph } from '../Graph';

export const solution = (data: string) => {
    partOne(data);
    partTwo(data);
};

export const partOne = (data: string) => {
    const parsedData = data.split('\n').map((line) => line.split(''));
    const graph = new Graph(parsedData);
    const answer = graph.BreadthFirstSearch('S', 'E').length;
    graph.printPath();

    console.log('Answer 1:', answer);
};

export const partTwo = (data: string) => {
    const parsedData = data.split('\n').map((line) => line.split(''));

    const stepsUntilDestination: number[] = [];

    parsedData.forEach((_, index) => {
        const graph = new Graph(parsedData);
        stepsUntilDestination.push(graph.BreadthFirstSearch({ x: 0, y: index }, 'E').length);
    });

    stepsUntilDestination.sort((a, b) => a - b);

    console.log('Answer 2:', stepsUntilDestination[0]);
};
