export const partOne = (values: string[]) => {
    const stackPositions = [1, 5, 9, 13, 17, 21, 25, 29, 33]
    const stackHeight = 8
    let stacks: string[][] = []

    for (const stackPosition of stackPositions) {
        let stack: string[] = []
        for (let i = 0; i < stackHeight; i++) {
            if (values[i][stackPosition] !== ' ') {
                stack.push(values[i][stackPosition])
            }
        }
        stack.reverse()
        stacks.push(stack)
    }

    const instructions = values.filter(line => line.startsWith('move'))
        .map(instruction => {
            return {
                numberOfBlocks: parseInt(instruction.split(' ')[1]),
                fromStack: parseInt(instruction.split(' ')[3]),
                toStack: parseInt(instruction.split(' ')[5])
            }
        });

    for (const instruction of instructions) {
        for (let i = 0; i < instruction.numberOfBlocks; i++) {
            let movingBlock = stacks[instruction.fromStack-1].pop()
            stacks[instruction.toStack-1].push(movingBlock || 'NO_BLOCK_FOUND')
        }
    }

    return stacks.map(stack => stack[stack.length-1]).join('')
}

export const partTwo = (values: string[]) => {
    return null
}
