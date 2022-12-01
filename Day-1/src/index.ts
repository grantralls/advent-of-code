import { readFile } from "fs/promises";
import { parseInput, sortByTotalCaloriesDescending } from "./utils";

readFile("src/input.txt", "utf-8")
    .then((data) => {
        const elves = parseInput(data);
        const sortedElves = sortByTotalCaloriesDescending(elves);

        console.log(`Answer 1: ${sortedElves[0].totalCalories}`);

        let topThreeCaloriesCombined = 0;
        sortedElves
            .slice(0, 3)
            .forEach((elf) => (topThreeCaloriesCombined += elf.totalCalories));

        console.log(`Answer 2: ${topThreeCaloriesCombined}`);
    })
    .catch((err) => console.error(err));
