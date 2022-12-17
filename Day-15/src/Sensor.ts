import { Coverage } from './utils/types';

export type Coordinate = {
    x: number;
    y: number;
};

export class Sensor {
    private size: number = 0;
    private location: Coordinate;
    private beaconLocation: Coordinate;
    private locationsWhereBeaconCantBeFound: number[] = [];
    private targetRow: number;

    constructor(location: Coordinate, beaconLocation: Coordinate, targetRow: number) {
        this.location = location;
        this.beaconLocation = beaconLocation;
        this.targetRow = targetRow;
    }

    public runSensor() {
        this.size =
            Math.abs(this.location.x - this.beaconLocation.x) + Math.abs(this.location.y - this.beaconLocation.y);

        let deltaY: number = 0;
        let change: number = 0;

        if (this.location.y >= this.targetRow && this.location.y - this.size <= this.targetRow) {
            deltaY = this.location.y - this.targetRow;
            change = this.size - deltaY;
        } else if (this.location.y <= this.targetRow && this.location.y + this.size >= this.targetRow) {
            deltaY = this.targetRow - this.location.y;
            change = this.size - deltaY;
        }

        const positiveX = this.location.x + change;
        const negativeX = this.location.x - change;

        this.locationsWhereBeaconCantBeFound.push(positiveX);
        this.locationsWhereBeaconCantBeFound.push(negativeX);
    }

    public getLocationsWhereBeaconCantBeFound(): Coverage | undefined {
        if (this.locationsWhereBeaconCantBeFound.length === 0) {
            return;
        }

        if (this.locationsWhereBeaconCantBeFound.length === 1) {
            return {
                length: 1,
                start: this.locationsWhereBeaconCantBeFound[0],
                end: this.locationsWhereBeaconCantBeFound[0],
            };
        }

        let length = 1;

        const sortedLocations = this.locationsWhereBeaconCantBeFound.sort((locationA, locationB) => {
            return locationA - locationB;
        });
        if (this.locationsWhereBeaconCantBeFound.length === 2) {
            length = sortedLocations[1] - sortedLocations[0] + 1;
        }

        return { length, start: sortedLocations[0], end: sortedLocations[1] };
    }
}
