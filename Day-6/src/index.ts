import { readFile } from 'fs/promises';

readFile('src/input.txt', 'utf-8').then((data) => {
    const splitDataStream = data.split('');
    const answerOne = getStartOfIndex([...splitDataStream], 4);
    console.log(`Answer one: ${answerOne}`);

    const answerTwo = getStartOfIndex([...splitDataStream], 14);
    console.log(`Answer two: ${answerTwo}`);
});

const getStartOfIndex = (datastream: string[], numberOfUniqueValues: number) =>
    datastream.reduce((acc: number, _: string, currentIndex: number, datastream: string[]) => {
        const arrayToCheck = datastream.slice(currentIndex, currentIndex + numberOfUniqueValues);

        const mySet = new Set(arrayToCheck);

        if (mySet.size === numberOfUniqueValues) {
            datastream.splice(1);
            return currentIndex + numberOfUniqueValues;
        }

        return acc;
    }, 0);
