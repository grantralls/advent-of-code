import { CRT } from './CathodeRayTube';

type Instruction = {
    operation: string;
    cyclesToComplete: number;
    action: (param: number) => void;
    amount?: number;
};

export class CPU {
    private register = 1;
    private registerValues: number[] = [];
    private instructions: Instruction[] = [];
    private currentInstruction: any | null = null;
    private crt: CRT;
    private crtStates: CRT[] = [];

    constructor(instructionSet: string[]) {
        this.crt = new CRT();
        this.instructions = this.convertInstructions(instructionSet);
        this.run();

        this.crt.printScreen();
    }

    public DataVisualization() {
        this.crtStates.forEach((crt, index) => {
            setTimeout(() => {
                crt.printScreen();
            }, 20 * index);
        });
    }

    private run(): void {
        let cycle = 1;

        // Set the current instruction to the first in the list
        this.currentInstruction = this.getNextInstruction(cycle);

        // While there are still instructions to process
        while (this.currentInstruction) {
            // If the instruction should have been excuted by end of the "previous" cycle
            // execute it
            if (this.currentInstruction.cycleToBeCompletedBy === cycle) {
                this.currentInstruction.action(this.currentInstruction.amount);
                this.currentInstruction = this.getNextInstruction(cycle);
            }

            // If the register is within 1 of the current x position of the current x position of the CRT
            const x = this.crt.getXByCycle(cycle);
            if (this.register <= x + 1 && this.register >= x - 1) {
                // Set the current x position of the CRT to be lit
                this.crt.setLitDuringCycle(cycle);
            }

            // Save crt states in an array for data visualization later
            this.crtStates.push(new CRT(this.crt));

            // Save the value of the register in an array for analysis later
            this.registerValues.push(this.register);

            // If there isn't a new instruction there isn't a need to increment the cycle
            this.currentInstruction && cycle++;
        }
    }

    public sumSignalStrengths(): number {
        let sum = 0;
        for (let cycle = 19; cycle <= this.registerValues.length; cycle += 40) {
            const currCycle = cycle + 1;
            sum += this.registerValues[cycle] * currCycle;
        }

        return sum;
    }

    private printRegisterValues(): void {
        for (let cycle = 19; cycle <= this.registerValues.length; cycle += 40) {
            console.log(`Cycle: ${cycle + 1} - Register: ${this.registerValues[cycle]}`);
        }
    }

    private getNextInstruction(currentCycle: number): any | null {
        const newInstruction = this.instructions.shift();
        return newInstruction?.cyclesToComplete
            ? { ...newInstruction, cycleToBeCompletedBy: currentCycle + newInstruction?.cyclesToComplete }
            : null;
    }

    private convertInstructions(instructionSet: string[]): Instruction[] {
        return instructionSet.map((instruction, currentCycle) => {
            const [operation, amount] = instruction.split(' ');
            const { cyclesToComplete, action } = this.InstructionMapper(operation);
            return {
                operation,
                cyclesToComplete,
                amount: parseInt(amount),
                action,
            };
        });
    }

    private InstructionMapper(operation: string) {
        const mapper = {
            addx: {
                operation: 'addx',
                cyclesToComplete: 2,
                action: (param: number) => this.incrementRegisterBy(param),
            },
            noop: { operation: 'noop', cyclesToComplete: 1, action: (param: number) => {} },
        };

        return mapper[operation as keyof typeof mapper];
    }

    private incrementRegisterBy(amountToIncrementBy: number): void {
        this.register += amountToIncrementBy;
    }

    private decremenRegisterBy(amountToDecrementBy: number): void {
        this.register -= amountToDecrementBy;
    }
}
