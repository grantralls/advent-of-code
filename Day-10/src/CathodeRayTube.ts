enum CRTValue {
    '.',
    '#',
}

const HEIGHT = 6;
const WIDTH = 40;

export class CRT {
    private screen: string[][] = Array.from(Array(HEIGHT)).map(() => Array.from(Array(WIDTH)).fill('.'));

    constructor(crtToCopy?: CRT) {
        if (crtToCopy) {
            this.screen = crtToCopy.screen.map((row) => row.slice());
        }
    }

    public printScreen() {
        console.clear();
        this.screen.forEach((row) => {
            console.log(row.join(''));
        });
    }

    public getXByCycle(cycle: number): number {
        return (cycle - 1) % WIDTH;
    }

    public getYByCycle(cycle: number): number {
        return Math.floor((cycle - 1) / WIDTH);
    }

    public setLitDuringCycle(cycle: number) {
        const x = (cycle - 1) % WIDTH;
        const y = Math.floor((cycle - 1) / WIDTH);
        this.screen[y][x] = CRTValue[CRTValue['#']];
    }
}
