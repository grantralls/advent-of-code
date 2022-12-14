import { Entity } from './Entity';
import { Coordinate } from './Entity';
import { Sand } from './Sand';

type RockFormation = Coordinate[];

// WARNING: This is some of the worst code I've ever written. I'm sorry. It passes the tests, but it's not pretty.
export class Cave {
    private smallestX: number | undefined = undefined;
    private largestX: number | undefined = undefined;
    private largestY: number | undefined = undefined;
    private cave: (Entity | null)[][] = [];
    private sands: Sand[] = [];
    private sandsBeforeVoid: number | undefined = undefined;
    private sandsBeforeSourceCoverage: number | undefined = undefined;

    constructor(input: string, private isPartOne: boolean) {
        const rockFormations = this.parseInput(input);

        rockFormations.forEach((rockFormation) => {
            this.buildRockFormation(rockFormation);
        });
    }

    /**
     * Add grains to the top of the cave. Simulate their physics and stop when the first grain overflows into the void.
     * @returns The number of grains that were added to the cave before the first grain overflowed.
     */
    public numberOfGrainsUntilOverflow() {
        try {
            while (true) {
                const newSand = new Sand({ x: 500 - (this.smallestX || 0), y: 0 });
                newSand.didMove = () => this.updateCave.bind(this)(newSand);
                this.sands.push(newSand);
                this.simulateSand();
            }
        } catch (err) {
            this.sandsBeforeVoid = this.sands.length - 1;
        }

        return this.sandsBeforeVoid;
    }

    /**
     * Add grains to the top of the cave. Simulate their physics and stop when the the grain settles exactly where it started (the source).
     * @returns The number of grains it took until a grain settled at the source.
     */
    public numberOfGrainsUntilSourceCoverage() {
        try {
            while (true) {
                // Try to keep the cave centered along the x axis
                const newSand = new Sand({
                    x:
                        500 -
                        (this.smallestX as number) +
                        Math.floor(((this.largestX as number) - Number(this.smallestX)) / 2) -
                        3,
                    y: 0,
                });

                newSand.didMove = () => this.updateCave.bind(this)(newSand);
                this.sands.push(newSand);

                this.simulateSand();
            }
        } catch (err) {
            console.log(err);
            this.sandsBeforeSourceCoverage = this.sands.length - 1;
        }

        return this.sandsBeforeSourceCoverage + 1;
    }

    /**
     * Simulate the physics the grain of sand retrieved from the last item in the sands array.
     */
    private simulateSand = () => {
        const latestSand = this.sands[this.sands.length - 1];

        // The 3 entities below the sand from low-left, low-middle, and low-right.
        let lowerEntities = this.cave
            .slice(latestSand.getLocation.y + 1, latestSand.getLocation.y + 2)[0]
            .slice(latestSand.getLocation.x - 1, latestSand.getLocation.x + 2);

        // If the sand can move, move it and update the lower entities.
        while (latestSand.canMove(lowerEntities, this.largestY as number, this.isPartOne)) {
            latestSand.move(lowerEntities);
            lowerEntities = this.cave
                .slice(latestSand.getLocation.y + 1, latestSand.getLocation.y + 2)[0]
                .slice(latestSand.getLocation.x - 1, latestSand.getLocation.x + 2);
        }
    };

    private parseInput(input: string): RockFormation[] {
        const rocksListAsStrings = input.split('\n').map((cave) => cave.split(' -> '));

        const rocksCoords: Coordinate[][] = rocksListAsStrings.map((rockCoordListAsString) => {
            const coordinates = rockCoordListAsString.map((rockCoordAsString) => {
                const rockCoordAsArray = rockCoordAsString.split(',').map((coord) => parseInt(coord));
                const rockLocation = { x: rockCoordAsArray[0], y: rockCoordAsArray[1] };
                if (typeof this.smallestX === 'undefined') {
                    this.smallestX = rockLocation.x;
                } else if (rockLocation.x < this.smallestX) {
                    this.smallestX = rockLocation.x;
                }

                if (typeof this.largestX === 'undefined') {
                    this.largestX = rockLocation.x;
                } else if (rockLocation.x > this.largestX) {
                    this.largestX = rockLocation.x;
                }

                if (typeof this.largestY === 'undefined') {
                    this.largestY = rockLocation.y;
                } else if (rockLocation.y > this.largestY) {
                    this.largestY = rockLocation.y;
                }

                return rockLocation;
            });
            return coordinates;
        });

        if (!this.isPartOne) {
            this.largestX = (this.largestX as number) + 1000;
        }

        const cleanedCaveCoordsArray = rocksCoords.map((cave) => {
            return cave.map((coord) => ({
                x:
                    coord.x -
                    (this.smallestX as number) +
                    (!this.isPartOne ? Math.floor(((this.largestX as number) - Number(this.smallestX)) / 2) - 3 : 0),
                y: coord.y,
            }));
        });

        return cleanedCaveCoordsArray;
    }

    /**
     * The location saved within a sand grain is separated from the cave array. This method updates the cave array with the new location.
     */
    private updateCave = (sand: Sand) => {
        this.cave[sand.getPreviousLocation.y][sand.getPreviousLocation.x] = null;
        this.cave[sand.getLocation.y][sand.getLocation.x] = sand;
    };

    public printCave() {
        const results = this.cave.map((row) => row.map((entity) => (entity !== null ? entity.getSymbol : '.')));

        results.forEach((row) => console.log(row.join('')));
    }

    private buildRockFormation(rockFormation: RockFormation) {
        if (this.cave.length === 0) {
            this.cave = Array.from(Array((this.largestY as number) + (!this.isPartOne ? 3 : 1)), () =>
                Array((this.largestX as number) - (this.smallestX as number) + 3).fill(null)
            );
        }

        rockFormation.forEach((coord, index) => {
            const previousCoord = index !== 0 ? rockFormation[index - 1] : undefined;

            if (previousCoord) {
                const xDelta = coord.x - previousCoord.x;
                const yDelta = coord.y - previousCoord.y;

                if (xDelta > 0) {
                    for (let i = 1; i < xDelta; i++) {
                        this.cave[coord.y][coord.x - i] = new Entity({ x: coord.x - 1, y: coord.y }, '#');
                    }
                } else if (xDelta < 0) {
                    for (let i = 1; i < Math.abs(xDelta); i++) {
                        this.cave[coord.y][coord.x + i] = new Entity({ x: coord.x + 1, y: coord.y }, '#');
                    }
                }

                if (yDelta > 0) {
                    for (let i = 1; i < yDelta; i++) {
                        this.cave[coord.y - i][coord.x] = new Entity({ x: coord.x, y: coord.y - 1 }, '#');
                    }
                } else if (yDelta < 0) {
                    for (let i = 1; i < Math.abs(yDelta); i++) {
                        this.cave[coord.y + i][coord.x] = new Entity({ x: coord.x, y: coord.y + i }, '#');
                    }
                }
            }

            this.cave[coord.y][coord.x] = new Entity(coord, '#');
        });
    }
}
