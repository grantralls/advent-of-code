type Instruction = {
    quantity: number;
    from: number;
    to: number;
};

type Ship = string[][];

type Data = {
    cleanedShip: Ship;
    instructions: Instruction[];
};

export const parseInput = (data: string): Data => {
    const splitByLine = data.split('\n');

    let ship = [];
    let instructionStartIndex = 0;

    // Each row in the matrix is a tower of crates
    // The first item in each tower is the "top" crate
    for (let currentLine = 0; !Number(splitByLine[currentLine][1]); currentLine++) {
        for (let currentPosition = 1; currentPosition <= splitByLine[currentLine].length; currentPosition += 4) {
            let crate = splitByLine[currentLine].charAt(currentPosition);

            if (ship[currentPosition] !== undefined && crate !== ' ') {
                ship[currentPosition].unshift(crate);
            } else if (crate !== ' ') {
                ship[currentPosition] = [crate];
            }
        }

        instructionStartIndex = currentLine + 3;
    }

    // Remove empty towers that occur
    const cleanedShip = ship.reduce<string[][]>(
        (accumulator, tower) => (Boolean(tower) ? [...accumulator, tower] : [...accumulator]),
        []
    );

    const instructions: Instruction[] = splitByLine
        .slice(instructionStartIndex, splitByLine.length)
        .map((unparsedInstruction) => {
            const parsedInstruction = unparsedInstruction.split(' ');

            return {
                quantity: Number(parsedInstruction[1]),
                from: Number(parsedInstruction[3]),
                to: Number(parsedInstruction[5]),
            };
        });

    return { cleanedShip, instructions };
};

export const crateMover = (parsedData: Data, is9000: boolean): Ship => {
    const { cleanedShip, instructions } = parsedData;

    instructions.forEach((instruction) => {
        const { quantity, from, to } = instruction;

        let cratesToMove: string[];

        if (quantity > cleanedShip[from - 1].length) {
            cratesToMove = cleanedShip[from - 1].splice(0);
        } else {
            cratesToMove = cleanedShip[from - 1].splice(cleanedShip[from - 1].length - quantity, quantity);
        }

        cratesToMove = is9000 ? cratesToMove.reverse() : cratesToMove;
        cleanedShip[to - 1].push(...cratesToMove);
    });

    return cleanedShip;
};

export const getCratesAtTopOfStack = (ship: Ship) => {
    const cratesAtTopOfStack = ship.map((tower) => tower[tower.length - 1]);
    return cratesAtTopOfStack.reduce((accumulator, crate) => (Boolean(crate) ? accumulator + crate : accumulator), '');
};
