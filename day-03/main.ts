import { join } from 'node:path'
import { readFileSync } from 'fs'

const values: string[] = readFileSync(join(__dirname, 'input.txt'), 'utf-8')
    .split('\n')

const priorities = (() => {
    const lowercase = [...Array(26)].map((val, i) => String.fromCharCode(i + 97));
    const upppercase = [...Array(26)].map((val, i) => String.fromCharCode(i + 65));
    return ['-', ...lowercase, ...upppercase];
})();

const partOne = (values: string[]) => {
    let sum = 0

    for (const contents of values) {
        const numItems = contents.length

        if (numItems % 2 === 1) {
            throw new Error('Odd number of items')
        }

        const compartmentSize = numItems / 2
        const compartmentOne = contents.slice(0, compartmentSize)
        const compartmentTwo = contents.slice(compartmentSize, numItems)
        const duplicate = compartmentOne.split('').find(item => compartmentTwo.includes(item))

        if (!duplicate) {
            throw new Error('Duplicate not found')
        }

        sum += priorities.indexOf(duplicate)
    }

    return sum
}

const partTwo = (values: string[]) => {
    const groupSize = 3
    const numberOfGroups = values.length / groupSize

    let groupNumber = 0
    let sum = 0

    while (groupNumber < numberOfGroups) {
        const startLine = groupNumber * groupSize
        const lines = [values[startLine], values[startLine+1], values[startLine+2]]

        const duplicate = lines[0].split('').find(item => {
            return lines[1].includes(item) && lines[2].includes(item)
        })

        if (!duplicate) {
            throw new Error('Duplicate not found')
        }

        sum += priorities.indexOf(duplicate)

        groupNumber += 1
    }

    return sum
}

console.log(partOne(values))
console.log(partTwo(values))
