import { CRT } from './CathodeRayTube';
import { CPU } from './CentralProcessingUnit';

export class CommunicationDevice {
    private cpu: CPU;
    private crt: CRT;
    private crtStates: CRT[] = [];

    constructor(instructionSet: string[]) {
        this.cpu = new CPU(instructionSet);
        this.cpu.onCycleRun = this.onCycleRun.bind(this);
        this.crt = new CRT();

        this.cpu.run();
    }

    private onCycleRun(cycle: number) {
        // if the cpu register is within 1 of the current position of the crt then set the pixel to lit
        const x = this.crt.getXByCycle(cycle);
        if (this.cpu.getRegister <= x + 1 && this.cpu.getRegister >= x - 1) {
            // Set the current x position of the CRT to be lit
            this.crt.setLitDuringCycle(cycle);
        }

        // Save the state of the CRT for later data visualization
        this.crtStates.push(new CRT(this.crt));
    }

    public DataVisualization() {
        this.crtStates.forEach((crt, index) => {
            setTimeout(() => {
                crt.printScreen();
            }, 20 * index);
        });
    }

    public get sumSignalStrengths(): number {
        return this.cpu.sumSignalStrengths();
    }
}
