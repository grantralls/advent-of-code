import { readFile } from "fs";

type Elf = {
    foodItems: Array<number>;
    totalCalories: number;
};

const parseData = (input: string): Elf[] => {
    const splitByElf = input.split("\n\n");

    const splitByElfAndFoodItem = splitByElf.map((elf) => {
        const itemByString = elf.split("\n");

        return itemByString.map((item) => Number(item));
    });

    return splitByElfAndFoodItem.map((elfFoodItems) => {
        let totalCalories = 0;
        elfFoodItems.forEach((foodItem) => (totalCalories += foodItem));

        return {
            foodItems: elfFoodItems,
            totalCalories,
        };
    });
};

const sortByTotalCaloriesDescending = (elves: Elf[]) => {
    return elves.sort(
        (leftElf, rightElf) => rightElf.totalCalories - leftElf.totalCalories
    );
};

readFile("./input.txt", "utf-8", (err, data) => {
    const elves = parseData(data);

    let topThreeCaloriesCombined = 0;

    sortByTotalCaloriesDescending(elves)
        .slice(0, 3)
        .map((elf) => {
            console.log(elf.totalCalories);
            topThreeCaloriesCombined += elf.totalCalories;
        });

    console.log(topThreeCaloriesCombined);
});
