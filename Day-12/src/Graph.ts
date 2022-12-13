import { Node } from './Node';

type ParentNode = null | { value: string; parentNode: Node };

export class Graph {
    private generatedNodes: Node[][] = [];
    private finalPath: (null | string)[][] = [];

    constructor(input: string[][]) {
        this.generatedNodes = this.generateNodes(input);

        this.generatedNodes.forEach((row) => {
            row.forEach((node) => {
                this.setNeighborsOfNode(node);
            });
        });
    }

    public printPath() {
        this.finalPath.forEach((row, y) => {
            const results = row.map((value, x) => (value ? value : '.'));
            console.log(y, results.join(''));
        });
    }

    // https://www.geeksforgeeks.org/breadth-first-search-or-bfs-for-a-graph/
    public BreadthFirstSearch(
        startingValue: string | { x: number; y: number },
        endingValue: string | { x: number; y: number }
    ) {
        const startingNode = this.findNodeByValue(startingValue);
        const endingNode = this.findNodeByValue(endingValue);

        const queue = [startingNode];
        const visited = new Set();

        // generate a matrix of nulls with the same dimensions as the input.
        // The nulls will be replaced by the ParentType
        const path: ParentNode[][] = Array.from(Array(this.generatedNodes.length)).map((row, y) => {
            return Array.from(Array(this.generatedNodes[y].length)).map(() => null);
        });

        visited.add(queue[0]);

        while (queue.length > 0) {
            const currentNode = queue.shift() as Node;
            if (currentNode === endingNode) {
                break;
            }

            currentNode.getNeighbors.forEach((neighbor) => {
                if (!visited.has(neighbor)) {
                    visited.add(neighbor);
                    const { x, y } = neighbor.getLocation;
                    path[y][x] = { value: currentNode.getValue, parentNode: currentNode };
                    queue.push(neighbor);
                    visited.add(neighbor);
                }
            });
        }

        return this.constructPath(path, endingNode as Node);
    }

    // Saves the parent of node x in the space of node x. This is used to construct the path by starting at the final node.
    private constructPath(path: ParentNode[][], finalNode: Node) {
        // Save a blank path for data visualization
        const generatePath: (null | string)[][] = Array.from(Array(this.generatedNodes.length)).map((row, y) => {
            return Array.from(Array(this.generatedNodes[y].length)).map(() => null);
        });

        let currentValue = path[finalNode.getLocation.y][finalNode.getLocation.x];
        generatePath[finalNode.getLocation.y][finalNode.getLocation.x] = 'X';
        const finalPath = [];

        while (currentValue) {
            finalPath.push(currentValue);
            generatePath[currentValue.parentNode.getLocation.y][currentValue.parentNode.getLocation.x] =
                currentValue.value.toUpperCase();
            currentValue = path[currentValue.parentNode.getLocation.y][currentValue.parentNode.getLocation.x];
        }

        this.finalPath = generatePath;

        const finalValue = finalPath.reverse();

        return finalValue;
    }

    private findNodeByValue(value: string | { x: number; y: number }): Node | undefined {
        let node: Node | undefined = undefined;

        if (typeof value === 'string') {
            this.generatedNodes.forEach((row, y) => {
                row.forEach((nodes, x) => {
                    if (nodes.getValue === value) {
                        node = this.generatedNodes[y][x];
                    }
                });
            });
        } else {
            node = this.generatedNodes[value.y][value.x];
        }

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
                this.isCharScoreOneOrLessHigher(
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

    private isCharScoreOneOrLessHigher(currentPosition: string, desiredPosition: string): boolean {
        // Let S be equivalent to a (the lowest score) and E be equivalent to z (the highest score)
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

    private generateNodes(input: string[][]): Node[][] {
        return input.map((row, y) => {
            return row.map((node, x) => {
                return new Node(node, { x, y });
            });
        });
    }
}
