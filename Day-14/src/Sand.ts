import { Coordinate, Entity } from './Entity';

export class Sand extends Entity {
    private previousLocation: Coordinate;
    public didMove: () => void = () => {};

    constructor(location: Coordinate) {
        super(location, 'o');
        this.previousLocation = location;
    }

    public move(entities: (Entity | null)[]) {
        if (entities[1] === null) {
            this.previousLocation = this.location;
            this.location = { x: this.location.x, y: this.location.y + 1 };
        } else if (entities[0] === null) {
            this.previousLocation = this.location;
            this.location = { x: this.location.x - 1, y: this.location.y + 1 };
        } else if (entities[2] === null) {
            this.previousLocation = this.location;
            this.location = { x: this.location.x + 1, y: this.location.y + 1 };
        }

        this.didMove();

        return this.location;
    }

    public canMove(entities: (Entity | undefined | null)[], maxY: number) {
        if (this.location.x === 0 || this.location.y === maxY) {
            throw new Error('void has taken the sand particle');
        }

        const results = entities.findIndex((entity) => entity === null);

        return results > -1;
    }

    public get getPreviousLocation() {
        return this.previousLocation;
    }
}
