export type Coverage = {
    length: number;
    start: number;
    end: number;
};

export type SensorBeaconPair = {
    sensor: { x: number; y: number };
    beacon: { x: number; y: number };
};
