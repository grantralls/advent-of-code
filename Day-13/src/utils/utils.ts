type Packet = (number | undefined | Packet)[];
type PacketPair = Packet[];

export const solution = (data: string) => {
    partOne(data);
    partTwo(data);
};

export const partOne = (data: string) => {
    const splitOnce = data.split('\n\n');
    const splitTwice = splitOnce.map((pair) => pair.split('\n'));
    const arraysList = splitTwice.map((pair) => [eval(pair[0]), eval(pair[1])]);
    const results = solveAllPairs(arraysList);
    const sum = sumIndicies(results);
    console.log('Answer 1:', sum);
};

export const partTwo = (data: string) => {
    const splitOnce = data.split('\n');
    const cleanedData = splitOnce.filter((array) => Boolean(array));
    const arraysList: Packet[] = cleanedData.map((arrayAsString) => eval(arrayAsString));
    arraysList.push([[2]]);
    arraysList.push([[6]]);
    quickSort(arraysList, 0, arraysList.length - 1);
    const firstDecoder = findDecoderIndex(arraysList, 2);
    const secondDecoder = findDecoderIndex(arraysList, 6);

    console.log('Answer 2:', firstDecoder * secondDecoder);
};

export const findDecoderIndex = (arraysList: Packet[], decoder: number) => {
    return (
        arraysList.findIndex(
            (packet) =>
                packet.length === 1 &&
                typeof packet[0] === 'object' &&
                packet[0].length === 1 &&
                packet[0][0] === decoder
        ) + 1
    );
};

const quickSort = (arr: Packet[], low: number, high: number) => {
    if (low < high) {
        let pi = partition(arr, low, high);

        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
};

const partition = (arr: Packet[], low: number, high: number) => {
    let pivot = arr[high];
    let i = low - 1;

    for (let j = low; j <= high - 1; j++) {
        if (leftComesBeforeRight(arr[j], pivot)) {
            i++;
            swap(arr, i, j);
        }
    }
    swap(arr, i + 1, high);
    return i + 1;
};

const swap = (arr: Packet[], i: number, j: number) => {
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
};

export const solveAllPairs = (data: PacketPair[]): boolean[] => {
    return data.map((pair) => leftComesBeforeRight(pair[0], pair[1]) as boolean);
};

export const sumIndicies = (data: boolean[]) => {
    const results = data.map((item, index) => (item ? index + 1 : 0));
    return results.reduce((acc, curr) => acc + curr, 0);
};

export const leftComesBeforeRight = (leftPacket: Packet, rightPacket: Packet): boolean | undefined => {
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
            isInRightOrder = leftComesBeforeRight([leftPacket[i]], rightPacket[i] as []);
        }

        if (typeof leftPacket[i] === 'object' && typeof rightPacket[i] === 'number') {
            isInRightOrder = leftComesBeforeRight(leftPacket[i] as [], [rightPacket[i]]);
        }

        if (typeof leftPacket[i] === 'object' && typeof rightPacket[i] === 'object') {
            isInRightOrder = leftComesBeforeRight(leftPacket[i] as [], rightPacket[i] as []);
        }

        if (typeof isInRightOrder === 'boolean') return isInRightOrder;

        if (i === leftPacket.length - 1 && rightPacket.length > leftPacket.length) return true;
    }
};
