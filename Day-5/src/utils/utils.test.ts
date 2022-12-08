import { getCratesAtTopOfStack, parseInput, crateMover } from './utils';
import { readFileSync } from 'fs';

describe('examples', () => {
    it('should return CMZ for crate mover 9000 on example input', () => {
        const data = readFileSync('src/utils/test-input.txt', 'utf8');
        const { cleanedShip, instructions } = parseInput(data);
        let modifiedInstructions = [...instructions.slice(0, instructions.length - 1)];
        const finalShip = crateMover({ cleanedShip, instructions: modifiedInstructions }, true);

        expect(getCratesAtTopOfStack(finalShip)).toStrictEqual('CMZ');
    });

    it('should return MCD for crate mover 9001 on example input', () => {
        const data = readFileSync('src/utils/test-input.txt', 'utf8');
        const { cleanedShip, instructions } = parseInput(data);
        let modifiedInstructions = [...instructions.slice(0, instructions.length - 1)];
        const finalShip = crateMover({ cleanedShip, instructions: modifiedInstructions }, false);

        expect(getCratesAtTopOfStack(finalShip)).toStrictEqual('MCD');
    });
});

describe('parseInput', () => {
    const data = readFileSync('src/utils/test-input.txt', 'utf8');
    const parsedData = parseInput(data);

    // Each sub array is a tower where the first element is the bottom
    it('should convert the ship data into a matrix', () => {
        const { cleanedShip } = parsedData;
        expect(cleanedShip).toStrictEqual([['Z', 'N'], ['M', 'C', 'D'], ['P']]);
    });

    it('should convert the instructions into objects', () => {
        const { instructions } = parsedData;

        const expectedInstructions = [
            {
                quantity: 1,
                from: 2,
                to: 1,
            },
            {
                quantity: 3,
                from: 1,
                to: 3,
            },
            {
                quantity: 2,
                from: 2,
                to: 1,
            },
            {
                quantity: 1,
                from: 1,
                to: 2,
            },
            {
                quantity: 10,
                from: 3,
                to: 1,
            },
        ];

        expect(instructions).toStrictEqual(expectedInstructions);
    });
});

describe('crateMover9000', () => {
    it('should move a single crate from one tower to another', () => {
        const data = readFileSync('src/utils/test-input.txt', 'utf8');
        const { cleanedShip } = parseInput(data);
        const instructions = [
            {
                quantity: 1,
                from: 2,
                to: 1,
            },
        ];

        const finalShip = crateMover({ cleanedShip, instructions }, true);

        expect(finalShip).toStrictEqual([['Z', 'N', 'D'], ['M', 'C'], ['P']]);
    });

    it('should move a multiple crates from one tower to another in a single instruction one at a time', () => {
        const data = readFileSync('src/utils/test-input.txt', 'utf8');
        const { cleanedShip } = parseInput(data);
        const instructions = [
            {
                quantity: 2,
                from: 2,
                to: 1,
            },
        ];

        const finalShip = crateMover({ cleanedShip, instructions }, true);

        expect(finalShip).toStrictEqual([['Z', 'N', 'D', 'C'], ['M'], ['P']]);
    });

    it('should move a multiple crates from one tower to another in a single instruction many at a time', () => {
        const data = readFileSync('src/utils/test-input.txt', 'utf8');
        const { cleanedShip } = parseInput(data);
        const instructions = [
            {
                quantity: 2,
                from: 2,
                to: 1,
            },
        ];

        const finalShip = crateMover({ cleanedShip, instructions }, false);

        expect(finalShip).toStrictEqual([['Z', 'N', 'C', 'D'], ['M'], ['P']]);
    });
});

describe('getCratesAtTopOfStack', () => {
    it('should return the top layer of the ship', () => {
        const ship = [['Z', 'N'], ['M', 'C', 'D'], ['P']];
        const results = getCratesAtTopOfStack(ship);

        expect(results).toStrictEqual('NDP');
    });

    it('should not return anything if a stack is empty', () => {
        const ship = [['Z', 'N'], ['M', 'C', 'D'], []];
        const results = getCratesAtTopOfStack(ship);

        expect(results).toStrictEqual('ND');
    });
});
