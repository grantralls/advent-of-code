type Elf = {
    foodItems: Array<number>;
    totalCalories: number;
};

export const solution = (data: string) => {
    const elves = parseInput(data);
    const sortedElves = sortByTotalCaloriesDescending(elves);

    console.log(`Answer 1: ${sortedElves[0].totalCalories}`);

    let topThreeCaloriesCombined = 0;
    sortedElves.slice(0, 3).forEach((elf) => (topThreeCaloriesCombined += elf.totalCalories));

    console.log(`Answer 2: ${topThreeCaloriesCombined}`);
};

export const parseInput = (input: string): Elf[] => {
    const splitByElf = input.split('\n\n');

    const splitByElfAndFoodItems: Array<Array<number>> = splitByElf.map((elf) => {
        const itemByString = elf.split('\n');

        return itemByString.map((item) => Number(item));
    });

    return splitByElfAndFoodItems.map((foodItems) => {
        let totalCalories = 0;
        foodItems.forEach((foodItem) => (totalCalories += foodItem));

        return {
            foodItems,
            totalCalories,
        };
    });
};

export const sortByTotalCaloriesDescending = (elves: Elf[]) =>
    elves.sort((leftElf, rightElf) => rightElf.totalCalories - leftElf.totalCalories);
