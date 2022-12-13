type Packet = (number | undefined | Packet)[];
type PacketPair = Packet[];

export const solution = (data: string) => {};

export const partOne = (data: string) => {
    const splitOnce = data.split('\n\n');
    const splitTwice = splitOnce.map((pair) => pair.split('\n'));
    const arraysList = splitTwice.map((pair) => [eval(pair[0]), eval(pair[1])]);
    const results = solveAllPairs(arraysList);
    const sum = sumIndicies(results);
    console.log('Answer 1:', sum);
};

export const solveAllPairs = (data: PacketPair[]): boolean[] => {
    return data.map((pair) => solvePair(pair) as boolean);
};

export const sumIndicies = (data: boolean[]) => {
    const results = data.map((item, index) => (item ? index + 1 : 0));
    return results.reduce((acc, curr) => acc + curr, 0);
};

export const solvePair = (data: PacketPair): boolean | undefined => {
    const leftPacket = data[0];
    const rightPacket = data[1];

    let isInRightOrder;

    if (leftPacket.length === 0 && rightPacket.length > 0) return true;

    for (let i = 0; i < leftPacket.length; i++) {
        if (rightPacket[i] === undefined) isInRightOrder = false;

        if (
            typeof rightPacket[i] === 'number' &&
            typeof leftPacket[i] === 'number' &&
            rightPacket[i] !== leftPacket[i]
        ) {
            isInRightOrder = (leftPacket[i] || 0) < (rightPacket[i] || 0);
        }

        if (typeof rightPacket[i] === 'object' && typeof leftPacket[i] === 'number') {
            isInRightOrder = solvePair([[leftPacket[i]], rightPacket[i] as []]);
        }

        if (typeof leftPacket[i] === 'object' && typeof rightPacket[i] === 'number') {
            isInRightOrder = solvePair([leftPacket[i] as [], [rightPacket[i]]]);
        }

        if (typeof leftPacket[i] === 'object' && typeof rightPacket[i] === 'object') {
            isInRightOrder = solvePair([leftPacket[i] as [], rightPacket[i] as []]);
        }

        if (typeof isInRightOrder === 'boolean') return isInRightOrder;

        if (i === leftPacket.length - 1) return true;
    }
};

export const partTwo = (data: string) => {
    console.log('Answer 2: __');
};
