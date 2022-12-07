export const solution = (data: string) => {
    const rucksacks = parseInput(data);

    const totalPriorityValueOfBadlyOrganizedItems = getPriorityTotalOfBadlyOrganizedItems(rucksacks);
    console.log(`Answer 1 ${totalPriorityValueOfBadlyOrganizedItems}`);

    const badgeValueSumOfAllElves = getTotalBadgePrioritiesFromAllElves(rucksacks);
    console.log(`Answer 2: ${badgeValueSumOfAllElves}`);
};

export const parseInput = (data: string) => data.split('\n');

export const getPriorityTotalOfBadlyOrganizedItems = (rucksackList: string[]) => {
    let total = 0;

    rucksackList.forEach((rucksack) => {
        const amountToAdd = getPrioritiesOfDuplicatesWithinRucksack(rucksack);
        total += amountToAdd;
    });

    return total;
};

export const getPrioritiesOfDuplicatesWithinRucksack = (rucksack: string) => {
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
        if (!checkedFoodItems.has(foodItem) && compartmentB.includes(foodItem)) {
            totalPriority += getPriorityOfFoodItem(foodItem);
            checkedFoodItems.add(foodItem);
        }
    });

    return totalPriority;
};

export const getTotalBadgePrioritiesFromAllElves = (rucksackList: string[]) => {
    let badgeValueSum = 0;

    // Loop through the data set in groups of 3
    for (let i = 2; i <= rucksackList.length; i += 3) {
        const elfGroup = rucksackList.slice(i - 2, i + 1);
        badgeValueSum += getBadgePriorityFromElfGroup(elfGroup);
    }

    return badgeValueSum;
};

export const getBadgePriorityFromElfGroup = (elfGroup: string[]) => {
    // Create a set for each elf that contains the unique items each elf has
    let listOfFoodItemSets: Set<string>[] = [];

    elfGroup.forEach((rucksack) => {
        const setOfItems = new Set<string>();
        const splitValue = rucksack.split('');

        splitValue.forEach((item) => {
            if (!setOfItems.has(item)) {
                setOfItems.add(item);
            }
        });
        listOfFoodItemSets.push(setOfItems);
    });

    // Find which item has present in the bag of all three elves and retrieve the priority level
    let badgeValueSum = 0;
    listOfFoodItemSets[0].forEach((foodItem: string) => {
        if (listOfFoodItemSets[1].has(foodItem) && listOfFoodItemSets[2].has(foodItem)) {
            badgeValueSum += getPriorityOfFoodItem(foodItem);
        }
    });

    return badgeValueSum;
};

export const getPriorityOfFoodItem = (character: string) => {
    if (character === character.toUpperCase()) {
        return character.charCodeAt(0) - 38;
    } else {
        return character.charCodeAt(0) - 96;
    }
};
