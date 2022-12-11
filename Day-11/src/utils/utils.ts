import { Item } from '../Item';
import { Monkey } from '../Monkey';

export const solution = (data: string) => {
    // partTwo(data);
    partOne(data);
};

const partTwo = (data: string) => {
    const monkeys = parseInput(data);

    for (let i = 0; i < 1000; i++) {
        monkeys.forEach((monkey) => {
            monkey.playRound();
        });
    }

    // const sortedMonkeys = monkeys.sort((monkeyA, monkeyB) => monkeyB.getTimesInspected() - monkeyA.getTimesInspected());
};

const partOne = (data: string) => {
    const monkeys = parseInput(data);

    for (let i = 0; i < 20; i++) {
        monkeys.forEach((monkey) => {
            monkey.playRound();
        });
    }

    const sortedMonkeys = monkeys.sort((monkeyA, monkeyB) => monkeyB.getTimesInspected() - monkeyA.getTimesInspected());

    console.log('Answer 1:', sortedMonkeys[0].getTimesInspected() * sortedMonkeys[1].getTimesInspected());
};

const parseInput = (data: string): Monkey[] => {
    const monkeyData = data.split('\n');
    const monkeys = [];

    for (let i = 0; i < monkeyData.length; i += 7) {
        const monkey = new Monkey(true);

        monkey.setItems(getStartingItems(monkeyData[i + 1]));
        monkey.worryLevelModifier = getModifier(monkeyData[i + 2]);

        monkeys.push(monkey);
    }

    for (let i = 0; i < monkeyData.length; i += 7) {
        const currentMonkey = monkeys[i / 7];

        currentMonkey.id = i / 7;
        currentMonkey.testCase = getTestCase(monkeyData.slice(i + 3, i + 6), monkeys);
    }

    return monkeys;
};

export const getStartingItems = (data: string): Item[] => {
    const splitLine = data.trim().split(' ');
    const numberArrayAsString = splitLine.slice(2, splitLine.length).join('');
    const numberArray = numberArrayAsString.split(',');

    return numberArray.map((number) => {
        return new Item(parseInt(number));
    });
};

export const getModifier = (data: string): ((param: number) => number) => {
    const splitLine = data.trim().split(' ');
    const operation = splitLine[4];

    return (param: number) => {
        const secondNumber = parseInt(splitLine[5]) ? splitLine[5] : param.toString();
        const numberAsString = param.toString();

        return eval(numberAsString + operation + secondNumber);
    };
};

export const getTestCase = (data: string[], monkeys: Monkey[]): ((worryLevel: number) => Monkey) => {
    const divisbleBy = parseInt(data[0].trim().split(' ')[3]);
    const trueMonkey = parseInt(data[1].trim().split(' ')[5]);
    const falseMonkey = parseInt(data[2].trim().split(' ')[5]);

    return (worryLevel: number) => {
        if (worryLevel % divisbleBy === 0) {
            return monkeys[trueMonkey];
        }
        return monkeys[falseMonkey];
    };
};
