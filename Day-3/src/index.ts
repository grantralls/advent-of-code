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
    // Split the rucksack into the 2 compartments
    const compartmentA = rucksack.slice(0, rucksack.length / 2);
    const compartmentB = rucksack.slice(rucksack.length / 2, rucksack.length);

    // prep compartment A to easily loop over it
    const splitCompartment = compartmentA.split('');

    let totalPriority = 0;

    // A specific character in compartment A should only ever get checked once
    // if compartment A has two "H"s and compartment B has a single H we
    // want that to count for a single match, not two matches
    const checkedFoodItems = new Set();

    splitCompartment.forEach((foodItem) => {
        if (
            !checkedFoodItems.has(foodItem) &&
            compartmentB.includes(foodItem)
        ) {
            totalPriority += getValueOfCharacter(foodItem);
            checkedFoodItems.add(foodItem);
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

const getBadgePriority = (elfGroup: string[]) => {
    // Create a set for each elf that contains the unique items each elf has
    let instancesList = [];

    elfGroup.forEach((rucksack) => {
        const setOfItems = new Set();
        const splitValue = rucksack.split('');

        splitValue.forEach((item) => {
            if (!setOfItems.has(item)) {
                setOfItems.add(item);
            }
        });
        instancesList.push(setOfItems);
    });

    // Find which item has present in the bag of all three elves and retrieve the priority level
    let badgeValueSum = 0;
    instancesList[0].forEach((foodItem) => {
        if (instancesList[1].has(foodItem) && instancesList[2].has(foodItem)) {
            badgeValueSum += getValueOfCharacter(foodItem);
        }
    });

    return badgeValueSum;
};
