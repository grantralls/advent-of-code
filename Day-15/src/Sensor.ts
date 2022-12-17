export type Coordinate = {
    x: number;
    y: number;
};

export class Sensor {
    private size: number = 0;
    private location: Coordinate;
    private beaconLocation: Coordinate;
    private locationsWhereBeaconCantBeFound: number[] = [];
    private desiredLocation: number;
    private width: number;

    constructor(location: Coordinate, beaconLocation: Coordinate, desiredLocation: number, width: number) {
        this.location = location;
        this.beaconLocation = beaconLocation;
        this.desiredLocation = desiredLocation;
        this.width = width;
    }

    public isPointInSensor(point: Coordinate): boolean {
        return false;
    }

    public runSensor() {
        this.setSize(
            Math.abs(this.location.x - this.beaconLocation.x) + Math.abs(this.location.y - this.beaconLocation.y)
        );

        if (this.location.y >= this.desiredLocation && this.location.y - this.size <= this.desiredLocation) {
            const deltaY = this.location.y - this.desiredLocation;
            const change = this.size - deltaY;
            const positiveX = this.location.x + change;
            const negativeX = this.location.x - change;

            this.locationsWhereBeaconCantBeFound.push(positiveX);

            this.locationsWhereBeaconCantBeFound.push(negativeX);
        } else if (this.location.y <= this.desiredLocation && this.location.y + this.size >= this.desiredLocation) {
            const deltaY = this.desiredLocation - this.location.y;
            const change = this.size - deltaY;
            const positiveX = this.location.x + change;
            const negativeX = this.location.x - change;

            this.locationsWhereBeaconCantBeFound.push(positiveX);

            this.locationsWhereBeaconCantBeFound.push(negativeX);
        }
    }

    public get getLocation() {
        return this.location;
    }

    public get getBeaconLocation() {
        return this.beaconLocation;
    }

    public getLocationsWhereBeaconCantBeFound() {
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

    public setSize(newSize: number): void {
        this.size = newSize;
    }
}
