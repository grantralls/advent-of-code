export class Node {
    private neighbors: Node[] = [];

    constructor(private value: string, private location: { x: number; y: number }) {}

    public get getValue() {
        return this.value;
    }

    public get locationAsString() {
        return `${this.location.x},${this.location.y}`;
    }

    public get getLocation() {
        return this.location;
    }

    public set setNeighbors(neighbors: Node[]) {
        this.neighbors = neighbors;
    }

    public get getNeighbors() {
        return this.neighbors;
    }
}
