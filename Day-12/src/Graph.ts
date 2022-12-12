import { Node } from './Node';

export class Graph {
    private startingNode: Node;
    private generatedNodes: Node[][] = [];

    constructor(private input: string[][]) {
        this.generatedNodes = this.generateNodes();
        this.startingNode = this.findNodeByValue('S') as unknown as Node;

        this.generatedNodes.forEach((row) => {
            row.forEach((node) => {
                this.setNeighborsOfNode(node);
            });
        });

        console.log(this.BreadthFirstSearch('E'));
    }

    private BreadthFirstSearch(desiredEndValue: string) {
        const queue: Node[] = [this.startingNode];
        const visited: Set<Node> = new Set();

        // Generates a matrix the same size of the nodes list and fills it will null
        const path: (null | { value: string; node: Node })[][] = Array.from(Array(this.generatedNodes.length)).map(
            (row) => {
                return Array.from(Array(this.generatedNodes[0].length)).map(() => null);
            }
        );

        while (queue.length > 0) {
            const currentNode = queue.shift() as Node;
            visited.add(currentNode);

            if (currentNode.getValue === desiredEndValue) {
                break;
            }

            currentNode.getNeighbors.forEach((neighbor) => {
                if (!visited.has(neighbor)) {
                    const { x, y } = neighbor.getLocation;
                    path[y][x] = { value: neighbor.getValue, node: currentNode };
                    queue.push(neighbor);
                }
            });
        }

        return this.constructPath(path).length;
    }

    private constructPath(path: (null | { value: string; node: Node })[][]) {
        const desiredLocation = { x: 5, y: 2 };
        const finalPath = [];

        let currentValue = path[desiredLocation.y][desiredLocation.x];

        while (currentValue) {
            finalPath.push(currentValue);
            currentValue = path[currentValue.node.getLocation.y][currentValue.node.getLocation.x];
        }

        const finalValue = finalPath.reverse();

        return finalValue;
    }

    private findNodeByValue(value: string) {
        let node: Node | undefined = undefined;

        this.generatedNodes.forEach((row, y) => {
            row.forEach((nodes, x) => {
                if (nodes.getValue === value) {
                    node = this.generatedNodes[y][x];
                }
            });
        });

        return node;
    }

    private setNeighborsOfNode(node: Node) {
        const { x, y } = node.getLocation;
        const neighbors = [
            { x: x + 1, y },
            { x: x - 1, y },
            { x, y: y + 1 },
            { x, y: y - 1 },
        ];

        const neighborsData = neighbors.filter((potentialNeighborLocation) => {
            return (
                this.generatedNodes[potentialNeighborLocation.y] &&
                this.generatedNodes[potentialNeighborLocation.y][potentialNeighborLocation.x] &&
                this.isCharWithinOneStepAway(
                    node.getValue,
                    this.generatedNodes[potentialNeighborLocation.y][potentialNeighborLocation.x].getValue
                )
            );
        });

        const neighborsNodes = neighborsData.map((neighborData) => {
            const { x, y } = neighborData;
            return this.generatedNodes[y][x];
        });

        node.setNeighbors = neighborsNodes;
    }

    private isCharWithinOneStepAway(charA: string, charB: string): boolean {
        const mapper = {
            S: 'a',
            E: 'z',
        };

        let newCharA = charA;
        let newCharB = charB;
        if (mapper[charA as keyof typeof mapper]) {
            newCharA = mapper[charA as keyof typeof mapper];
        }

        if (mapper[charB as keyof typeof mapper]) {
            newCharB = mapper[charB as keyof typeof mapper];
        }

        return Math.abs(newCharA.charCodeAt(0) - newCharB.charCodeAt(0)) <= 1;
    }

    private generateNodes(): Node[][] {
        return this.input.map((row, y) => {
            return row.map((node, x) => {
                return new Node(node, { x, y });
            });
        });
    }
}
