import { Direction } from './Rope';

type Location = {
    x: number;
    y: number;
};

export class Node {
    private location: Location;
    private previousLocation: Location;

    constructor() {
        this.location = { x: 0, y: 0 };
        this.previousLocation = { x: 0, y: 0 };
    }

    public getLocationAsString(): string {
        return `${this.location.x}, ${this.location.y}`;
    }

    public getLocation(): Location {
        return this.location;
    }

    public setLocation(location: Location) {
        this.previousLocation = { ...this.location };
        this.location = location;
    }

    public getPreviousLocation(): Location {
        return this.previousLocation;
    }

    public moveNode(direction: Direction, numOfSteps: number) {
        this.previousLocation = { ...this.location };

        switch (direction) {
            case Direction.R:
                this.location.x += numOfSteps;
                break;
            case Direction.U:
                this.location.y += numOfSteps;
                break;
            case Direction.L:
                this.location.x -= numOfSteps;
                break;
            case Direction.D:
                this.location.y -= numOfSteps;
                break;
        }
    }
}
