type Elf = {
    min: number;
    max: number;
};

type ElfGroup = Elf[];

export const parseData = (data: string): ElfGroup[] => {
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

        // Sorting the elves so the elf with the largest delta is first
        const unsortedResult = [elfA, elfB];
        const sortedResult = unsortedResult.sort((a, b) => b.delta - a.delta);

        return sortedResult;
    });
};

export const getTotalNumberOfTotalOverlaps = (elfGroups: ElfGroup[]): number => {
    return elfGroups.reduce((acc, elfGroup) => {
        const elfA = elfGroup[0];
        const elfB = elfGroup[1];

        if (elfA.max >= elfB.max && elfA.min <= elfB.min) {
            return acc + 1;
        }

        return acc;
    }, 0);
};

export const getTotalNumberOfPartialOverlaps = (elfGroups: ElfGroup[]): number => {
    return elfGroups.reduce((acc, elfGroup) => {
        const elfA = elfGroup[0];
        const elfB = elfGroup[1];

        if (elfA.min <= elfB.max && elfA.max >= elfB.min) {
            return acc + 1;
        }

        return acc;
    }, 0);
};
