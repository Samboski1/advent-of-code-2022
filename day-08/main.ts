const getTreeHeights = (values: string[]) => {
    return values.map(row => {
        return row.split('').map(height => {
            return parseInt(height)
        })
    });
}

const determineSurroundingTrees = (forest: number[][], xPosition: number, yPosition: number) => {
    const treeCount = forest.length // Assume forest is square
    const surroundingTrees: number[][] = []

    for (const direction of ['top', 'right', 'bottom', 'left']) {
        let trees: number[] = []
        switch (direction) {
            case 'left':
                trees = trees.concat([...Array(yPosition-0).keys()].map(thisY => forest[xPosition][thisY]).reverse())
                break;
            case 'top':
                trees = trees.concat([...Array(xPosition-0).keys()].map(thisX => forest[thisX][yPosition]).reverse())
                break;
            case 'right':
                trees = trees.concat([...Array(treeCount-1-yPosition).keys()].map(thisY => forest[xPosition][yPosition+thisY+1]))
                break;
            case 'bottom':
                trees = trees.concat([...Array(treeCount-1-xPosition).keys()].map(thisX => forest[xPosition+thisX+1][yPosition]))
                break;
        }
        surroundingTrees.push(trees)
    }

    return surroundingTrees
}

export const partOne = (values: string[]) => {
    const treeHeights: number[][] = getTreeHeights(values)
    const treeCount = values.length // Assume forest is square

    let visibleTreeCount = 0;

    for (let x = 0; x < treeCount; x++) {
        for (let y = 0; y < treeCount; y++) {
            const thisTreeHeight = treeHeights[x][y]

            for (const trees of determineSurroundingTrees(treeHeights, x, y)) {
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
    const treeHeights: number[][] = getTreeHeights(values)
    const treeCount = values.length // Assume forest is square

    let maxScore = 0

    for (let x = 0; x < treeCount; x++) {
        for (let y = 0; y < treeCount; y++) {
            const thisTreeHeight = treeHeights[x][y]
            const scenicScores: number[] = []

            for (const trees of determineSurroundingTrees(treeHeights, x, y)) {
                let visibility = 0
                for (const tree of trees) {
                    visibility += 1
                    if (thisTreeHeight <= tree) {
                        break
                    }
                }
                scenicScores.push(visibility)
            }

            const scenicScore = scenicScores.reduce((acc, curr) => acc * curr, 1)
            if (scenicScore > maxScore) {
                maxScore = scenicScore
            }
        }
    }

    return maxScore
}
