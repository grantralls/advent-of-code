import { readFile } from 'fs/promises';
import {
    DesiredResult,
    myChoiceMapper,
    opponentChoiceMapper,
} from './game-logic';

readFile('src/input.txt', 'utf-8').then((data) => {
    const games = parseInput(data);

    const firstScore = playGamePartOne(games);
    console.log(`Answer 1: ${firstScore}`);

    const secondScore = playGamePartTwo(games);
    console.log(`Answer 2: ${secondScore}`);
});

const parseInput = (data: string) => {
    const splitByGame = data.split('\n');
    return splitByGame.map((game) => game.split(' '));
};

const playGamePartOne = (gameData: Array<Array<string>>) => {
    let totalScore = 0;

    gameData.forEach((game) => {
        const myChoice = myChoiceMapper[game[1] as keyof typeof myChoiceMapper];
        const opponentChoice =
            opponentChoiceMapper[game[0] as keyof typeof opponentChoiceMapper];

        if (myChoice.value === opponentChoice.value) {
            totalScore += 3;
        } else if (myChoice.winsAgainst?.value === opponentChoice.value) {
            totalScore += 6;
        }

        totalScore += myChoice.pointValue || 0;
    });

    return totalScore;
};

const playGamePartTwo = (gameData: Array<Array<string>>) => {
    let totalScore = 0;

    gameData.forEach((game) => {
        const opponentChoice =
            opponentChoiceMapper[game[0] as keyof typeof opponentChoiceMapper];

        const desiredResult =
            DesiredResult[game[1] as keyof typeof DesiredResult];

        if (desiredResult === 'Win') {
            const myChoice = opponentChoice.loosesAgainst;
            totalScore += 6 + myChoice.pointValue;
        } else if (desiredResult === 'Lose') {
            const myChoice = opponentChoice.winsAgainst;
            totalScore += myChoice.pointValue;
        } else if (desiredResult === 'Draw') {
            const myChoice = opponentChoice;
            totalScore += 3 + myChoice.pointValue;
        }
    });

    return totalScore;
};
