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

    public canMove(entities: (Entity | undefined | null)[], maxY: number, isPartOne: boolean) {
        if (isPartOne && this.location.x === 0) {
            throw {
                message: 'grain overflowed into void',
                code: 'grain_overflowed_into_void',
            };
        }

        const results = entities.findIndex((entity) => entity === null);

        if (results === -1 && this.location.y === 0) {
            throw {
                message: 'grain covered source',
                code: 'grain_covered_source',
            };
        }

        return isPartOne ? results > -1 : results > -1 && this.location.y !== maxY + 1;
    }

    public get getPreviousLocation() {
        return this.previousLocation;
    }
}
