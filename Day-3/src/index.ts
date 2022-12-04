import { readFile } from 'fs/promises';

readFile('src/input.txt', 'utf-8').then((data) => {
    const rucksacks = parseInput(data);
    console.log(`Answer 1 ${getPriorityTotal(rucksacks)}`);

    let badgeValueSum = 0;

    // Loop through the data set in groups of 3
    for (let i = 2; i <= rucksacks.length; i += 3) {
        const elfGroup = rucksacks.slice(i - 2, i + 1);
        badgeValueSum += getBadgePriority(elfGroup);
    }

    console.log(`Answer 2: ${badgeValueSum}`);
});

const parseInput = (data: string) => data.split('\n');

const getPriorityTotal = (rucksackList: string[]) => {
    let total = 0;

    rucksackList.forEach((rucksack) => {
        const amountToAdd = getPrioritiesOfDuplicatesWithinRucksack(rucksack);
        total += amountToAdd;
    });

    return total;
};

const getPrioritiesOfDuplicatesWithinRucksack = (rucksack: string) => {
    const compartmentA = rucksack.slice(0, rucksack.length / 2);
    const compartmentB = rucksack.slice(rucksack.length / 2, rucksack.length);

    const splitCompartment = compartmentA.split('');

    let totalPriority = 0;
    const checkedCharacters = new Set();

    splitCompartment.forEach((character) => {
        if (
            !checkedCharacters.has(character) &&
            compartmentB.includes(character)
        ) {
            totalPriority += getValueOfCharacter(character);
            checkedCharacters.add(character);
        }
    });

    return totalPriority;
};

const getValueOfCharacter = (character: string) => {
    if (character === character.toUpperCase()) {
        return character.charCodeAt(0) - 38;
    } else {
        return character.charCodeAt(0) - 96;
    }
};

const getBadgePriority = (input: string[]) => {
    let instancesList = [];

    input.forEach((value) => {
        let instancesOfChar = {};
        const splitValue = value.split('');

        splitValue.forEach((character) => {
            if (instancesOfChar[character] === undefined) {
                instancesOfChar[character] = 1;
            } else {
                instancesOfChar[character] += 1;
            }
        });
        instancesList.push(instancesOfChar);
    });

    let badgeValueSum = 0;

    for (const item in instancesList[0]) {
        if (instancesList[1][item] && instancesList[2][item]) {
            badgeValueSum += getValueOfCharacter(item);
        }
    }

    return badgeValueSum;
};
