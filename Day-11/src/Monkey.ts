import { Item } from './Item';

export class Monkey {
    private itemsHeld: Item[] = [];
    public worryLevelModifier: (currentWorryLevel: number) => number;
    public testCase: (currentWorryLevel: number) => Monkey;
    public id = 0;
    private timesInspected = 0;

    constructor(
        startingItems?: Item[],
        worryLevelModifier?: (currentWorryLevel: number) => number,
        testCase?: (currentWorryLevel: number) => Monkey
    ) {
        this.itemsHeld = startingItems || [];
        this.worryLevelModifier = worryLevelModifier || ((currentWorryLevel: number) => currentWorryLevel);
        this.testCase = testCase || ((currentWorryLevel: number) => this);
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
        const newWorryLevel = this.worryLevelModifier(this.itemsHeld[0].getWorryLevel());

        // Immediately divide by three since the Monkey gets bored easily
        this.itemsHeld[0].setWorryLevel(Math.floor(newWorryLevel / 3));

        this.timesInspected++;
    }

    private receiveItem(item: Item) {
        this.itemsHeld.push(item);
    }
}
