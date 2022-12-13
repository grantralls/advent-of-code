type Packet = (number | undefined | Packet)[];
type PacketPair = Packet[];

export const solution = (data: string) => {
    const splitOnce = data.split('\n\n');
    const splitTwice = splitOnce.map((pair) => pair.split('\n'));
    const arraysList = splitTwice.map((pair) => [eval(pair[0]), eval(pair[1])]);
    const results = solveAllPairs(arraysList);
    console.log(results);
    const sum = sumIndicies(results);
    console.log(sum);
    // partTwo(data);
};

export const solveAllPairs = (data: PacketPair[]): boolean[] => {
    return data.map((pair) => solvePair(pair) as boolean);
};

export const sumIndicies = (data: boolean[]) => {
    const results = data.map((item, index) => (item ? index + 1 : 0));
    return results.reduce((acc, curr) => acc + curr, 0);
};

export const solvePair = (data: PacketPair): boolean | undefined => {
    const longestArray = data.reduce((acc, curr) => (acc > curr.length ? acc : curr.length), 0);

    let isInRightOrder;

    for (let i = 0; i < longestArray && isInRightOrder === undefined; i++) {
        const leftSide = data[0][i] || data[0][i] === 0 ? data[0][i] : undefined;
        const rightSide = data[1][i] || data[1][i] === 0 ? data[1][i] : undefined;

        const isRightSideNumberOrUndefined = typeof rightSide === 'number' || typeof rightSide === 'undefined';
        const isLeftSideNumberOrUndefined = typeof leftSide === 'number' || typeof leftSide === 'undefined';

        if (isRightSideNumberOrUndefined && isLeftSideNumberOrUndefined) {
            if (leftSide !== undefined && rightSide === undefined) {
                isInRightOrder = false;
                break;
            }

            if (leftSide === undefined && rightSide !== undefined) {
                isInRightOrder = true;
                break;
            }

            if (rightSide !== undefined && leftSide !== undefined && leftSide < rightSide) {
                isInRightOrder = true;
                break;
            }

            if (rightSide !== undefined && leftSide !== undefined && leftSide > rightSide) {
                isInRightOrder = false;
                break;
            }
        } else {
            if (leftSide !== undefined && rightSide === undefined) {
                isInRightOrder = false;
                break;
            }
            if (typeof rightSide === 'object' && typeof leftSide === 'number') {
                isInRightOrder = solvePair([[leftSide], rightSide as Packet]);
            }
            if (typeof leftSide === 'object' && typeof rightSide === 'number') {
                isInRightOrder = solvePair([leftSide as Packet, [rightSide]]);
            }
            if (typeof leftSide === 'object' && typeof rightSide === 'object') {
                isInRightOrder = solvePair([leftSide as Packet, rightSide as Packet]);
            }
        }
    }

    return isInRightOrder;
};

export const getPacketValue = (data: Packet, index: number): number | undefined => {
    // Arrays are objects in JS

    if (typeof data[index] === 'object') return getPacketValue(data[index] as Packet, 0);

    return data[index] as number | undefined;
};

export const solveForPair = (data: PacketPair) => {};

export const partTwo = (data: string) => {
    console.log('Answer 2: __');
};
