import { readFile } from 'fs/promises';

readFile('src/input.txt', 'utf-8').then((data) => {
    const parsedAndSortedElves = parseData(data);
    const answerOne = getTotalNumberOfTotalOverlaps(parsedAndSortedElves);
    console.log('Answer One:', answerOne);

    const answerTwo = getTotalNumberOfPartialOverlaps(parsedAndSortedElves);
    console.log('Answer Two:', answerTwo);
});

type Elf = {
    min: number;
    max: number;
};

type ElfGroup = Elf[];

const parseData = (data: string): ElfGroup[] => {
    const splitByElfGroup = data.split('\n');

    return splitByElfGroup.map((elfGroup) => {
        const splitByElf = elfGroup.split(',');

        const elfAMin = parseInt(splitByElf[0].split('-')[0]);
        const elfAMax = parseInt(splitByElf[0].split('-')[1]);
        const elfA = {
            min: elfAMin,
            max: elfAMax,
            delta: elfAMax - elfAMin,
        };

        const elfBMin = parseInt(splitByElf[1].split('-')[0]);
        const elfBMax = parseInt(splitByElf[1].split('-')[1]);
        const elfB = {
            min: elfBMin,
            max: elfBMax,
            delta: elfBMax - elfBMin,
        };

        const unsortedResult = [elfA, elfB];
        const sortedResult = unsortedResult.sort((a, b) => b.delta - a.delta);

        return sortedResult;
    });
};

const getTotalNumberOfTotalOverlaps = (elfGroups: ElfGroup[]): number => {
    return elfGroups.reduce((acc, elfGroup) => {
        const elfA = elfGroup[0];
        const elfB = elfGroup[1];

        if (elfA.max >= elfB.max && elfA.min <= elfB.min) {
            return acc + 1;
        }

        return acc;
    }, 0);
};

const getTotalNumberOfPartialOverlaps = (elfGroups: ElfGroup[]): number => {
    return elfGroups.reduce((acc, elfGroup) => {
        const elfA = elfGroup[0];
        const elfB = elfGroup[1];

        if (elfA.min <= elfB.max && elfA.max >= elfB.min) {
            return acc + 1;
        }

        return acc;
    }, 0);
};
