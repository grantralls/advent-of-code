export class Item {
    private worryLevel: number;

    constructor(worryLevel: number) {
        this.worryLevel = worryLevel;
    }

    public setWorryLevel(worryLevel: number) {
        this.worryLevel = worryLevel;
    }

    public getWorryLevel() {
        return this.worryLevel;
    }
}
