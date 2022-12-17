import { Sensor } from '../Sensor';
import { Coverage, SensorBeaconPair } from './types';

export const solution = (data: string) => {
    partOne(data);
    partTwo(data);
};

export const partTwo = (data: string) => {
    /**
     * i is hardcoded to 3429555 because that's the answer for the input.
     * The answer was found running from zero but I don't want to do that to
     * a machine again. Even with my optimizations it is still a lot of numbers to crunch.
     * To actually solve the problem for some input, change i to equal 0
     */
    for (let i = 3429555; i < 4000000; i++) {
        console.log('y:', i);
        const results = problemLogic(data, i, 4000000);
        if (results.numberOfPlacesBeaconCantBe < 4000001) {
            console.log('Answer 2:', (results.actualCoverage[0].end + 1) * 4000000 + i);
            break;
        }
    }
};

export const partOne = (data: string) => {
    const results = problemLogic(data, 10);

    console.log('Answer 1:', results.numberOfPlacesBeaconCantBe);
};

export const problemLogic = (data: string, targetRow: number, width?: number) => {
    const sensorBeaconPairs = parseInput(data);

    const sensors = sensorBeaconPairs.map((pair) => new Sensor(pair.sensor, pair.beacon, targetRow));

    sensors.forEach((sensor) => {
        sensor.runSensor();
    });

    const sensorCoverage: Coverage[] = [];

    sensors.forEach((sensor) => {
        const locations = sensor.getLocationsWhereBeaconCantBeFound();

        if (locations !== undefined) {
            sensorCoverage.push(locations);
        }
    });

    sensorCoverage.sort((sensorA, sensorB) => sensorA.start - sensorB.start);

    const actualCoverage = calculateActualCoverage(sensorCoverage, width);

    let numberOfPlacesBeaconCantBe = actualCoverage.reduce((acc, coverage) => acc + coverage.length, 0);

    // If a beacon is on the row in question, don't include its location
    const beaconsRemoved = new Set();
    sensorBeaconPairs.forEach((pair) => {
        if (pair.beacon.y === targetRow && !beaconsRemoved.has(pair.beacon.x)) {
            numberOfPlacesBeaconCantBe--;
            beaconsRemoved.add(pair.beacon.x);
        }
    });

    return { numberOfPlacesBeaconCantBe, actualCoverage };
};

export const calculateActualCoverage = (data: Coverage[], width?: number): Coverage[] => {
    /**
     * Oftentimes 2 coverage objects have overlap. One may start at 0 and end at 10 while
     * the other starts at 5 and ends at 15. Both of these coverage readings have a length
     * of 10. This is a problem because 5-10 is being counted twice. This function removes
     * the overlap by modifying the previousCoverage object to have a length of 15, starting
     * at the beginning of the first (0) and ending at the end of the second (15).
     */

    const actualCoverage: Coverage[] = [];

    data.forEach((coverage, index) => {
        if (index === 0) {
            actualCoverage.push(coverage);
        } else {
            const previousCoverage = actualCoverage[actualCoverage.length - 1];

            if (previousCoverage.end >= coverage.start) {
                if (previousCoverage.end < coverage.end) {
                    previousCoverage.length = previousCoverage.length + (coverage.end - previousCoverage.end);
                    previousCoverage.end = coverage.end;
                }
            } else {
                actualCoverage.push(coverage);
            }
        }
    });

    /**
     * The width can be set to only find the coverage for a subset of x values.
     * If a coverage object has a length of 10 and goes from -2 to 8, but the
     * width is set to 5, then the coverage object should be modified to have a length
     * of 5 and go from 0 to 5.
     */
    if (width !== undefined) {
        if (actualCoverage[0].start < 0) {
            actualCoverage[0].length = actualCoverage[0].length + actualCoverage[0].start;
            actualCoverage[0].start = 0;
        }

        if (actualCoverage[actualCoverage.length - 1].end > width) {
            actualCoverage[actualCoverage.length - 1].length =
                actualCoverage[actualCoverage.length - 1].length -
                (actualCoverage[actualCoverage.length - 1].end - width);
            actualCoverage[actualCoverage.length - 1].end = width;
        }
    }

    return actualCoverage;
};

export const parseInput = (data: string): SensorBeaconPair[] => {
    /**
     * Takes lines in the format:
     * Sensor at x=1, y=2: closest beacon is at x=3, y=4
     * Sensor at x=5, y=6: closest beacon is at x=7, y=8
     * and returns an array of the numbers in the format:
     * [[1, 2, 3, 4], [5, 6, 7, 8]]
     */
    const parsedInts: number[][] = data.split('\n').map((line) =>
        line
            .split(' ')
            .filter((word) => word[0] === 'x' || word[0] === 'y')
            .map((word, index) => {
                if (index !== 3) {
                    return parseInt(word.slice(2, word.length - 1));
                }

                return parseInt(word.slice(2));
            })
    );

    // Coverts the array of numbers into an array of objects
    const sensorBeaconPair = parsedInts.map((combo) => ({
        sensor: { x: combo[0], y: combo[1] },
        beacon: { x: combo[2], y: combo[3] },
    }));

    return sensorBeaconPair;
};
