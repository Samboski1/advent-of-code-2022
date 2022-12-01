import { join } from 'node:path'
import { readFileSync } from 'fs'

const values: number[] = readFileSync(join(__dirname, 'input.txt'), 'utf-8').split('\n').map(value => parseInt(value))

const sumChunks = (values: number[]) => {
    let chunks: number[] = []

    values.reduce((accumulator, currentValue) => {
        if (Number.isNaN(currentValue)) {
            chunks.push(accumulator)
            return 0;
        }
        return accumulator + currentValue
    })

    return chunks
}

const partOne = (values: number[]) => {
    return Math.max(...sumChunks(values))
}

const partTwo = (values: number[]) => {
    return sumChunks(values).sort((a, b) => {
        return b - a
    }).slice(0, 3).reduce((acc, current) => {
        return acc + current
    })
}

console.log(partOne(values))
console.log(partTwo(values))
