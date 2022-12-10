enum CRTValue {
    '.',
    '#',
}

export class CRT {
    private screen: string[][] = Array.from(Array(6)).map(() => Array.from(Array(40)).fill('.'));

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
        return (cycle - 1) % 40;
    }

    public getYByCycle(cycle: number): number {
        return Math.floor((cycle - 1) / 40);
    }

    public setLitDuringCycle(cycle: number) {
        const x = (cycle - 1) % 40;
        const y = Math.floor((cycle - 1) / 40);
        this.screen[y][x] = CRTValue[CRTValue['#']];
    }
}
