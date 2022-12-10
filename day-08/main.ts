export const partOne = (values: string[]) => {
    const treeCount = values.length // Assume forest is square

    const treeHeights = values.map(row => {
        return row.split('').map(height => {
            return parseInt(height)
        })
    });

    const determineSurroundingTrees = (xPosition: number, yPosition: number) => {
        const surroundingTrees: number[][] = []

        for (const direction of ['top', 'right', 'bottom', 'left']) {
            let trees: number[] = []
            switch (direction) {
                case 'left':
                    trees = trees.concat([...Array(yPosition-0).keys()].map(thisY => treeHeights[xPosition][thisY]))
                    break;
                case 'top':
                    trees = trees.concat([...Array(xPosition-0).keys()].map(thisX => treeHeights[thisX][yPosition]))
                    break;
                case 'right':
                    trees = trees.concat([...Array(treeCount-1-yPosition).keys()].map(thisY => treeHeights[xPosition][yPosition+thisY+1]))
                    break;
                case 'bottom':
                    trees = trees.concat([...Array(treeCount-1-xPosition).keys()].map(thisX => treeHeights[xPosition+thisX+1][yPosition]))
                    break;
            }
            surroundingTrees.push(trees)
        }

        return surroundingTrees
    }

    let visibleTreeCount = 0;

    for (let x = 0; x < treeCount; x++) {
        for (let y = 0; y < treeCount; y++) {
            const thisTreeHeight = treeHeights[x][y]

            for (const trees of determineSurroundingTrees(x, y)) {
                if (trees.every(tree => tree < thisTreeHeight)) {
                    visibleTreeCount +=1
                    break
                }
            }
        }
    }

    return visibleTreeCount
}

export const partTwo = (values: string[]) => {
}
