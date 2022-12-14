import { Entity } from './Entity';
import { Coordinate } from './Entity';
import { Sand } from './Sand';

type RockFormation = Coordinate[];

export class Cave {
    private smallestX: number | undefined = undefined;
    private largestX: number | undefined = undefined;
    private largestY: number | undefined = undefined;
    private cave: (Entity | null)[][] = [];
    private sands: Sand[] = [];
    private sandsBeforeVoid: number | undefined = undefined;

    constructor(input: string) {
        const rockFormations = this.parseInput(input);

        rockFormations.forEach((rockFormation) => {
            this.buildRockFormation(rockFormation);
        });
    }

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

    private simulateSand = () => {
        const latestSand = this.sands[this.sands.length - 1];

        let lowerEntities = this.cave
            .slice(latestSand.getLocation.y + 1, latestSand.getLocation.y + 2)[0]
            .slice(latestSand.getLocation.x - 1, latestSand.getLocation.x + 2);

        while (latestSand.canMove(lowerEntities, this.largestY as number)) {
            latestSand.move(lowerEntities);
            lowerEntities = this.cave
                .slice(latestSand.getLocation.y + 1, latestSand.getLocation.y + 2)[0]
                .slice(latestSand.getLocation.x - 1, latestSand.getLocation.x + 2);
        }
    };

    private parseInput(input: string): RockFormation[] {
        const caveArray = input.split('\n').map((cave) => cave.split(' -> '));

        const caveCoordsArray: number[][][] = caveArray.map((cave) => {
            const results = cave.map((caveCoord) => {
                const results = caveCoord.split(',').map((coord) => parseInt(coord));

                if (typeof this.smallestX === 'undefined') {
                    this.smallestX = results[0];
                } else if (results[0] < this.smallestX) {
                    this.smallestX = results[0];
                }

                if (typeof this.largestX === 'undefined') {
                    this.largestX = results[0];
                } else if (results[0] > this.largestX) {
                    this.largestX = results[0];
                }

                if (typeof this.largestY === 'undefined') {
                    this.largestY = results[1];
                } else if (results[1] > this.largestY) {
                    this.largestY = results[1];
                }

                return results;
            });

            return results;
        });

        const cleanedCaveCoordsArray = caveCoordsArray.map((cave) => {
            return cave.map((coord) => ({
                x: coord[0] - (this.smallestX as number),
                y: coord[1],
            }));
        });

        return cleanedCaveCoordsArray;
    }

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
            this.cave = Array.from(Array((this.largestY as number) + 1), () =>
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
