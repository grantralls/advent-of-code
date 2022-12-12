import { Item } from '../Item';
import { Monkey } from '../Monkey';

export const solution = (data: string) => {
    partOne(data);
    partTwo(data);
};

export const partTwo = (data: string) => {
    const monkeys = parseInput(data, false);

    for (let i = 0; i < 10000; i++) {
        monkeys.forEach((monkey) => {
            monkey.playRound();
        });
    }

    const sortedMonkeys = monkeys.sort((monkeyA, monkeyB) => monkeyB.getTimesInspected() - monkeyA.getTimesInspected());

    console.log('Answer 2:', sortedMonkeys[0].getTimesInspected() * sortedMonkeys[1].getTimesInspected());
};

export const partOne = (data: string) => {
    const monkeys = parseInput(data, true);

    for (let i = 0; i < 20; i++) {
        monkeys.forEach((monkey) => {
            monkey.playRound();
        });
    }

    const sortedMonkeys = monkeys.sort((monkeyA, monkeyB) => monkeyB.getTimesInspected() - monkeyA.getTimesInspected());

    console.log('Answer 1:', sortedMonkeys[0].getTimesInspected() * sortedMonkeys[1].getTimesInspected());
};

export const parseInput = (data: string, isPartOne: boolean): Monkey[] => {
    const monkeyData = data.split('\n');
    const monkeys = [];

    // Setup the initial monkeys
    for (let i = 0; i < monkeyData.length; i += 7) {
        const monkey = new Monkey(isPartOne);

        monkey.setItems(getStartingItems(monkeyData[i + 1]));
        monkey.worryLevelModifier = getModifier(monkeyData[i + 2]);

        monkeys.push(monkey);
    }

    // Setup the dependencies between monkeys and the lcm (Least Common Multiple).
    let lcm = 1;
    for (let i = 0; i < monkeyData.length; i += 7) {
        const currentMonkey = monkeys[i / 7];

        const testCase = getTestCase(monkeyData.slice(i + 3, i + 6), monkeys);

        currentMonkey.testCase = testCase.testFunction;

        lcm = lcm * testCase.divisibleBy;
    }

    // Set the calculated lcm on all monkeyss
    monkeys.forEach((monkey) => {
        monkey.lcm = lcm;
    });

    return monkeys;
};

/**
 * @param data in the form of 'Starting Items: 1, 2, 3, 4'
 * @returns [1, 2, 3, 4]
 */
export const getStartingItems = (data: string): Item[] => {
    const splitLine = data.trim().split(' ');
    const numberArrayAsString = splitLine.slice(2, splitLine.length).join('');
    const numberArray = numberArrayAsString.split(',');

    return numberArray.map((number) => {
        return new Item(parseInt(number));
    });
};

/**
 * WARNING: This function uses eval() to execute the operation.
 * @param data in the form of 'Operation: new = old + 6'
 * @returns a function that executes the operation on a given number
 */
export const getModifier = (data: string): ((param: number) => number) => {
    const splitLine = data.trim().split(' ');
    const operation = splitLine[4];

    return (param: number) => {
        const secondNumber = parseInt(splitLine[5]) ? splitLine[5] : param.toString();
        const numberAsString = param.toString();

        return eval(numberAsString + operation + secondNumber);
    };
};

type TestCaseReturn = {
    testFunction: (worryLevel: number) => Monkey;
    divisibleBy: number;
};

export const getTestCase = (data: string[], monkeys: Monkey[]): TestCaseReturn => {
    const divisbleBy = parseInt(data[0].trim().split(' ')[3]);
    const trueMonkey = parseInt(data[1].trim().split(' ')[5]);
    const falseMonkey = parseInt(data[2].trim().split(' ')[5]);

    return {
        testFunction: (worryLevel: number) => {
            if (worryLevel % divisbleBy === 0) {
                return monkeys[trueMonkey];
            }
            return monkeys[falseMonkey];
        },
        divisibleBy: divisbleBy,
    };
};
