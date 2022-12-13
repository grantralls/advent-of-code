import { Node } from './Node';

export class Graph {
    private startingNode: Node;
    private generatedNodes: Node[][] = [];
    private endingNode: Node;

    constructor(private input: string[][]) {
        this.generatedNodes = this.generateNodes();
        this.startingNode = this.findNodeByValue('S') as unknown as Node;
        this.endingNode = this.findNodeByValue('E') as unknown as Node;

        this.generatedNodes.forEach((row) => {
            row.forEach((node) => {
                this.setNeighborsOfNode(node);
            });
        });

        console.log(this.BreadthFirstSearch());
    }

    private BreadthFirstSearch() {
        const queue = [this.startingNode];
        const visited = new Set();
        const path: (null | { value: string; node: Node })[][] = Array.from(Array(this.generatedNodes.length)).map(
            (row, y) => {
                return Array.from(Array(this.generatedNodes[y].length)).map(() => null);
            }
        );

        visited.add(queue[0]);

        while (queue.length > 0) {
            const currentNode = queue.shift() as Node;
            // visited.add(currentNode);
            if (currentNode === this.endingNode) {
                break;
            }

            currentNode.getNeighbors.forEach((neighbor) => {
                if (!visited.has(neighbor)) {
                    visited.add(neighbor);
                    const { x, y } = neighbor.getLocation;
                    path[y][x] = { value: currentNode.getValue, node: currentNode };
                    queue.push(neighbor);
                    visited.add(neighbor);
                }
            });
        }

        path.forEach((row, y) => {
            const results = row.map((node, x) => (node ? this.generatedNodes[y][x].getValue.toUpperCase() : '.'));
            console.log(y, results.join(''));
        });

        return this.constructPath(path).length;
    }

    private constructPath(path: (null | { value: string; node: Node })[][]) {
        let currentValue = path[this.endingNode.getLocation.y][this.endingNode.getLocation.x];
        const finalPath = [];

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

    private isCharWithinOneStepAway(currentPosition: string, desiredPosition: string): boolean {
        const mapper = {
            S: 'a',
            E: 'z',
        };

        let newCurrentPosition = currentPosition;
        let newDesiredPosition = desiredPosition;
        if (mapper[currentPosition as keyof typeof mapper]) {
            newCurrentPosition = mapper[currentPosition as keyof typeof mapper];
        }

        if (mapper[desiredPosition as keyof typeof mapper]) {
            newDesiredPosition = mapper[desiredPosition as keyof typeof mapper];
        }

        const result = newDesiredPosition.charCodeAt(0) - newCurrentPosition.charCodeAt(0) <= 1;

        return result;
    }

    private generateNodes(): Node[][] {
        return this.input.map((row, y) => {
            return row.map((node, x) => {
                return new Node(node, { x, y });
            });
        });
    }
}
