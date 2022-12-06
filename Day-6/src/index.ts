import { readFile } from 'fs/promises';

readFile('src/input.txt', 'utf-8').then((data) => {
    const splitDataStream = data.split('');
    const answerOne = getStartOfIndex([...splitDataStream], getPacket);
    console.log(`Answer one: ${answerOne}`);

    const answerTwo = getStartOfIndex([...splitDataStream], getMessage);
    console.log(`Answer two: ${answerTwo}`);
});

const getStartOfIndex = (
    datastream: string[],
    callback: (
        acc: number,
        currentValue: string,
        currentIndex: number,
        datastream: string[]
    ) => number
) => datastream.reduce(callback, 0);

const getPacket = (
    acc: number,
    _: string,
    currentIndex: number,
    datastream: string[]
) => {
    const arrayToCheck = datastream.slice(currentIndex, currentIndex + 4);

    const mySet = new Set(arrayToCheck);

    if (mySet.size === 4) {
        datastream.splice(1);
        return currentIndex + 4;
    }

    return acc;
};

const getMessage = (
    acc: number,
    _: string,
    currentIndex: number,
    datastream: string[]
) => {
    const arrayToCheck = datastream.slice(currentIndex, currentIndex + 14);

    const mySet = new Set(arrayToCheck);

    if (mySet.size === 14) {
        datastream.splice(1);
        return currentIndex + 14;
    }

    return acc;
};
