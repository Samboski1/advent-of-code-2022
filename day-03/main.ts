import { join } from 'node:path'
import { readFileSync } from 'fs'

const values: string[] = readFileSync(join(__dirname, 'input.txt'), 'utf-8')
    .split('\n')

const partOne = (values: string[]) => {
    const priorities = (() => {
        const lowercase = [...Array(26)].map((val, i) => String.fromCharCode(i + 97));
        const upppercase = [...Array(26)].map((val, i) => String.fromCharCode(i + 65));
        return ['-', ...lowercase, ...upppercase];
    })();

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

console.log(partOne(values))
