export const solution = (data: string) => {
    const treeGrid = parseInput(data);
    console.log('Answer 1:', findTotalNumberOfTreesVisibleFromEdge(treeGrid));
    console.log('Answer 2:', getTreeWithHighestScenicScore(treeGrid));
};

type TreeGrid = number[][];

export const getTreeWithHighestScenicScore = (treeGrid: TreeGrid) => {
    const scoredTrees = treeGrid.map((treeLayer, currentLayer) => {
        return treeLayer.map((tree, currentTree) => {
            return getScoreOfTree(currentTree, currentLayer, treeGrid);
        });
    });

    const bestTreePerRow = scoredTrees.map((row) => row.sort((a, b) => b - a)[0]);

    return bestTreePerRow.sort((a, b) => a - b).reverse()[0];
};

export const findTotalNumberOfTreesVisibleFromEdge = (treeGrid: TreeGrid) =>
    treeGrid.reduce<number>(
        (gridAcc, treeLayer, currentLayer) =>
            gridAcc +
            treeLayer.reduce<number>((acc, tree, currentTreeIndex) => {
                const verticalLayer = getVerticalLayerOfTree(currentTreeIndex, treeGrid);
                if (isVisibleInLayer(currentTreeIndex, treeLayer) || isVisibleInLayer(currentLayer, verticalLayer)) {
                    return acc + 1;
                }

                return acc;
            }, 0),
        0
    );

export const getScoreOfTree = (xOfTreeToCheck: number, yOfTreeToCheck: number, treeGrid: TreeGrid): number => {
    const horizontalScore = getScoreOfTreeInLayer(xOfTreeToCheck, treeGrid[yOfTreeToCheck]);
    const verticalLayer = getVerticalLayerOfTree(xOfTreeToCheck, treeGrid);

    const verticalScore = getScoreOfTreeInLayer(yOfTreeToCheck, verticalLayer);

    return verticalScore * horizontalScore;
};

export const getVerticalLayerOfTree = (xOfTreeToCheck: number, treeGrid: TreeGrid) => {
    return treeGrid.map((layer) => layer[xOfTreeToCheck]);
};

export const getScoreOfTreeInLayer = (indexOfTreeToCheck: number, treeLayer: number[]) => {
    const treeHeight = treeLayer[indexOfTreeToCheck];
    const leftOfSelectedTree = treeLayer.slice(0, indexOfTreeToCheck).reverse();
    const rightOfSelectedTree = treeLayer.slice(indexOfTreeToCheck + 1, treeLayer.length);

    const leftScore =
        indexOfTreeToCheck === 0
            ? 0
            : leftOfSelectedTree.reduce<number>((acc, tree) => {
                  if (treeHeight <= tree) {
                      leftOfSelectedTree.splice(1);
                  }
                  return acc + 1;
              }, 0);

    const rightScore =
        indexOfTreeToCheck === treeLayer.length - 1
            ? 0
            : rightOfSelectedTree.reduce<number>((acc, tree) => {
                  if (treeHeight <= tree) {
                      rightOfSelectedTree.splice(1);
                  }
                  return acc + 1;
              }, 0);

    return leftScore * rightScore;
};

export const parseInput = (data: string): TreeGrid => {
    const splitByLine = data.split('\n');
    return splitByLine.map((line) => line.split('').map((char) => Number(char)));
};

export const isVisibleInLayer = (indexOfTreeToCheck: number, treeLayer: number[]): boolean => {
    const isEdgeTree = indexOfTreeToCheck === 0 || indexOfTreeToCheck === treeLayer.length - 1;
    const treeHeight = treeLayer[indexOfTreeToCheck];

    if (isEdgeTree) {
        return true;
    }

    const leftOfSelectedTree = treeLayer.slice(0, indexOfTreeToCheck).sort();
    const rightOfSelectedTree = treeLayer.slice(indexOfTreeToCheck + 1, treeLayer.length).sort();

    return (
        treeHeight > leftOfSelectedTree[leftOfSelectedTree.length - 1] ||
        treeHeight > rightOfSelectedTree[rightOfSelectedTree.length - 1]
    );
};
