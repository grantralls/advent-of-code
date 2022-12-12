import { Item } from './Item';

// In some instances the value of the item can get so large that it overflows the number type.
// This is a problem because the worry level is used to determine the next monkey to throw the item to.
// This problem is solved by saving the worry level as the modulo of the least common multiple between
// all monkey 'divisible by' values. This way the worry level will never be larger than the least common multiple.
export class Monkey {
    private itemsHeld: Item[] = [];
    public worryLevelModifier: (currentWorryLevel: number) => number;
    public testCase: (currentWorryLevel: number) => Monkey;
    private timesInspected = 0;
    private isPartOne: boolean;
    public lcm: number = 1;

    constructor(
        isPartOne: boolean,
        startingItems?: Item[],
        worryLevelModifier?: (currentWorryLevel: number) => number,
        testCase?: (currentWorryLevel: number) => Monkey
    ) {
        this.itemsHeld = startingItems || [];
        this.worryLevelModifier = worryLevelModifier || ((currentWorryLevel: number) => currentWorryLevel);
        this.testCase = testCase || ((_: number) => this);
        this.isPartOne = isPartOne;
    }

    public playRound() {
        let numOfItems = this.itemsHeld.length;

        while (numOfItems > 0) {
            this.inspectFirstItem();
            this.throwFirstItem();
            numOfItems--;
        }
    }

    public setItems(items: Item[]) {
        this.itemsHeld = items;
    }

    public getTimesInspected() {
        return this.timesInspected;
    }

    private throwFirstItem() {
        const monkeyToThrowTo = this.testCase(this.itemsHeld[0].getWorryLevel());

        const itemRemovedFromMonkey = this.itemsHeld.shift();

        monkeyToThrowTo.receiveItem(itemRemovedFromMonkey as Item);
    }

    private inspectFirstItem() {
        if (this.itemsHeld.length !== 0) {
            this.timesInspected++;
        }

        // The item value should never exceed the Least Common Multiple of all monkeys.
        const newWorryLevel = this.worryLevelModifier(this.itemsHeld[0].getWorryLevel()) % this.lcm;

        // Boolean to give different answers for part 1 and 2.
        const division = this.isPartOne ? 3 : 1;

        this.itemsHeld[0].setWorryLevel(Math.floor(newWorryLevel / division));
    }

    private receiveItem(item: Item) {
        this.itemsHeld.push(item);
    }
}
