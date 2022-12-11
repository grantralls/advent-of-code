import { Node } from './Node';

export enum Direction {
    'R',
    'U',
    'L',
    'D',
}

export class Rope {
    private nodes: Node[];
    private locationsVisitedByTail: Set<string>;
    private instructionSet: string[];
    private nodeStateFrames: Node[][] = [];

    constructor(instructionSet: string[], numOfNodes: number) {
        this.nodes = [...Array.from(Array(numOfNodes))].map(() => new Node());
        this.locationsVisitedByTail = new Set();
        this.instructionSet = instructionSet;
    }

    public executeInstructions() {
        this.instructionSet.forEach((instruction) => {
            const splitInstruction = instruction.split(' ');
            this.moveNodes(splitInstruction[0] as keyof typeof Direction, parseInt(splitInstruction[1]));
        });
    }

    public numberOfLocationsVisitedByTail(): number {
        return this.locationsVisitedByTail.size;
    }

    public printRope() {
        this.nodeStateFrames.forEach((nodeState, index) => {
            setTimeout(() => {
                console.clear();
                const field = Array.from(Array(50)).map(() => Array.from(Array(50)).map(() => '.'));

                nodeState.forEach((node: any, nodeIndex) => {
                    const nodeName = nodeIndex === 0 ? 'H' : nodeIndex.toString();

                    field[field.length / 2 - node.location.y][node.location.x + field.length / 2] = nodeName;
                });

                field.forEach((row) => {
                    console.log(row.join(''));
                });

                if (index === this.nodeStateFrames.length - 1) {
                    console.log('Answer:', this.numberOfLocationsVisitedByTail(), 'locations visited by tail.');
                }
            }, index * 100);
        });
    }

    private moveBrokenNode(node: Node, index: number) {
        const brokenNode = this.nodes[index + 1];

        const deltaX = node.getLocation().x - brokenNode.getLocation().x;
        const deltaY = node.getLocation().y - brokenNode.getLocation().y;

        const normalizedDeltaX = deltaX / Math.abs(deltaX) || 0;
        const normalizedDeltaY = deltaY / Math.abs(deltaY) || 0;

        const moveByX = brokenNode.getLocation().x + normalizedDeltaX;
        const moveByY = brokenNode.getLocation().y + normalizedDeltaY;

        brokenNode.setLocation({ x: moveByX, y: moveByY });
    }

    private moveNodes(direction: keyof typeof Direction, numOfSteps: number) {
        Array.from(Array(numOfSteps)).forEach(() => {
            this.nodes[0].moveNode(Direction[direction], 1);

            this.nodes.forEach((node, index) => {
                if (this.isRopeBrokenAtNode(index)) {
                    this.moveBrokenNode(node, index);
                }
            });

            const tailLocation = this.nodes[this.nodes.length - 1].getLocationAsString();

            this.nodeStateFrames.push(structuredClone(this.nodes));

            this.locationsVisitedByTail.add(tailLocation);
        });
    }

    private isRopeBrokenAtNode(nodeIndex: number): boolean {
        if (nodeIndex === this.nodes.length - 1) {
            return false;
        }

        const locationOfNodeToCheck = this.nodes[nodeIndex].getLocation();
        const locationOfNodeAfter = this.nodes[nodeIndex + 1].getLocation();

        const deltaX = Math.abs(locationOfNodeToCheck.x - locationOfNodeAfter.x);
        const deltaY = Math.abs(locationOfNodeToCheck.y - locationOfNodeAfter.y);

        if (deltaX <= 1 && deltaY <= 1) {
            return false;
        } else {
            return true;
        }
    }
}
