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

    private moveBrokenNode(node: Node, index: number) {
        const brokenNode = this.nodes[index + 1];
        const deltaX = node.getLocation().x - brokenNode.getLocation().x;
        const deltaY = node.getLocation().y - brokenNode.getLocation().y;

        const moveByX = brokenNode.getLocation().x + (deltaX / Math.abs(deltaX) || 0);
        const moveByY = brokenNode.getLocation().y + (deltaY / Math.abs(deltaY) || 0);

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
