type Elf = {
    foodItems: Array<number>;
    totalCalories: number;
};

export const parseInput = (input: string): Elf[] => {
    const splitByElf = input.split("\n\n");

    const splitByElfAndFoodItems: Array<Array<number>> = splitByElf.map(
        (elf) => {
            const itemByString = elf.split("\n");

            return itemByString.map((item) => Number(item));
        }
    );

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
    elves.sort(
        (leftElf, rightElf) => rightElf.totalCalories - leftElf.totalCalories
    );
