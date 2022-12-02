// Opportunities for refactoring:
//  1. Use classes instead of objects for syntactic sugar

type Choice = {
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

export const Rock: Partial<Choice> = {
    value: 'Rock',
    pointValue: 1,
};

export const Paper: Partial<Choice> = {
    value: 'Paper',
    pointValue: 2,
};

export const Scissors: Partial<Choice> = {
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
