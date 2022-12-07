// Opportunities for refactoring:
//  1. Use classes instead of objects for syntactic sugar

export type Choice = {
    value: string;
    pointValue: number;
    winsAgainst: Partial<Choice>;
    loosesAgainst: Partial<Choice>;
};

export enum DesiredResult {
    X = 'Lose',
    Y = 'Draw',
    Z = 'Win',
}

const Rock: Partial<Choice> = {
    value: 'Rock',
    pointValue: 1,
};

const Paper: Partial<Choice> = {
    value: 'Paper',
    pointValue: 2,
};

const Scissors: Partial<Choice> = {
    value: 'Scissors',
    pointValue: 3,
};

Rock.winsAgainst = Scissors;
Rock.loosesAgainst = Paper;

Paper.winsAgainst = Rock;
Paper.loosesAgainst = Scissors;

Scissors.winsAgainst = Paper;
Scissors.loosesAgainst = Rock;

export const myChoiceMapper = {
    X: Rock,
    Y: Paper,
    Z: Scissors,
};

export const opponentChoiceMapper = {
    A: Rock,
    B: Paper,
    C: Scissors,
};

export const solution = (data: string) => {
    const games = parseInput(data);

    const firstScore = playGamePartOne(games);
    console.log(`Answer 1: ${firstScore}`);

    const secondScore = playGamePartTwo(games);
    console.log(`Answer 2: ${secondScore}`);
};

export const parseInput = (data: string) => {
    const splitByGame = data.split('\n');
    return splitByGame.map((game) => game.split(' '));
};

export const playGamePartOne = (gameData: Array<Array<string>>) => {
    let totalScore = 0;

    gameData.forEach((game) => {
        const myChoice = myChoiceMapper[game[1] as keyof typeof myChoiceMapper];
        const opponentChoice = opponentChoiceMapper[game[0] as keyof typeof opponentChoiceMapper];

        if (myChoice.value === opponentChoice.value) {
            totalScore += 3;
        } else if (myChoice.winsAgainst?.value === opponentChoice.value) {
            totalScore += 6;
        }

        totalScore += myChoice.pointValue || 0;
    });

    return totalScore;
};

export const playGamePartTwo = (gameData: Array<Array<string>>) => {
    let totalScore = 0;

    gameData.forEach((game) => {
        const opponentChoice = opponentChoiceMapper[game[0] as keyof typeof opponentChoiceMapper];

        const desiredResult = DesiredResult[game[1] as keyof typeof DesiredResult];

        if (desiredResult === 'Win') {
            const myChoice = opponentChoice.loosesAgainst;
            totalScore += 6 + (myChoice as Choice).pointValue;
        } else if (desiredResult === 'Lose') {
            const myChoice = opponentChoice.winsAgainst;
            totalScore += (myChoice as Choice).pointValue;
        } else if (desiredResult === 'Draw') {
            const myChoice = opponentChoice;
            totalScore += 3 + (myChoice as Choice).pointValue;
        }
    });

    return totalScore;
};
