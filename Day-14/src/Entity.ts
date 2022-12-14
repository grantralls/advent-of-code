export type Coordinate = {
    x: number;
    y: number;
};

export class Entity {
    protected location: Coordinate;
    private symbol: string;

    constructor(location: Coordinate, symbol: string) {
        this.symbol = symbol;
        this.location = location;
    }

    public get getLocation() {
        return this.location;
    }

    public get getSymbol() {
        return this.symbol;
    }

    public setNeighbors() {
        // TODO
    }
}
