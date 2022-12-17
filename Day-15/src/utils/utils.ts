import { Sensor } from '../Sensor';

export const solution = (data: string) => {
    runPartTwo(data);
    // partTwo(data);
};

export const runPartTwo = (data: string) => {
    /**
     * i is hardcoded to 3429555 because that's the answer for the input.
     * The answer was found running from zero but I don't want to do that to
     * a machine again. Even with my optimizations it is still a lot of numbers to crunch.
     * To actually solve the problem for some input, change i to equal 0
     */
    for (let i = 3429555; i < 4000000; i++) {
        console.log('y:', i);
        const results = partTwoLogic(data, i, 4000000);
        if (results.numberOfPlacesBeaconCantBe < 4000001) {
            console.log('Answer:', (results.actualCoverage[0].end + 1) * 4000000 + i);
            break;
        }
    }
};

export const partTwoLogic = (data: string, desiredLocation: number, width: number) => {
    const { sensorBeaconCombo } = parseInput(data, desiredLocation, width);

    const sensors = sensorBeaconCombo.map((combo) => {
        const sensor = new Sensor(combo.sensor, combo.beacon, desiredLocation, width);
        return sensor;
    });

    sensors.forEach((sensor) => {
        sensor.runSensor();
    });

    const sensorCoverage: { length: number; start: number; end: number }[] = [];

    sensors.forEach((sensor) => {
        const locations = sensor.getLocationsWhereBeaconCantBeFound();

        if (locations !== undefined) {
            sensorCoverage.push(locations as any);
        }
    });

    sensorCoverage.sort((sensorA, sensorB) => sensorA.start - sensorB.start);

    const actualCoverage = calculateActualCoverage(sensorCoverage, width);

    const numberOfPlacesBeaconCantBe = actualCoverage.reduce((acc, coverage) => acc + coverage.length, 0);

    return { numberOfPlacesBeaconCantBe, actualCoverage };
};

type Coverage = {
    length: number;
    start: number;
    end: number;
};

export const calculateActualCoverage = (data: Coverage[], width: number): Coverage[] => {
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

    if (actualCoverage[0].start < 0) {
        actualCoverage[0].length = actualCoverage[0].length + actualCoverage[0].start;
        actualCoverage[0].start = 0;
    }

    if (actualCoverage[actualCoverage.length - 1].end > width) {
        actualCoverage[actualCoverage.length - 1].length =
            actualCoverage[actualCoverage.length - 1].length - (actualCoverage[actualCoverage.length - 1].end - width);
        actualCoverage[actualCoverage.length - 1].end = width;
    }

    return actualCoverage;
};
const parseInput = (data: string, desiredLocation: number, width: number) => {
    const parsedInts = data.split('\n').map((line) =>
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

    const sensorBeaconCombo = parsedInts.map((combo) => ({
        sensor: { x: combo[0], y: combo[1] },
        beacon: { x: combo[2], y: combo[3] },
    }));

    return { sensorBeaconCombo };
};
