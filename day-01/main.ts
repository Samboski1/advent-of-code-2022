import { join } from 'node:path'
import { readFileSync } from 'fs'

const values: number[] = readFileSync(join(__dirname, 'input.txt'), 'utf-8').split('\n').map(value => parseInt(value))

const partOne = (values: number[]) => {
    let maximum = 0, sum = 0;

    for (const value of values) {
        if (Number.isNaN(value)) {
            if (sum > maximum) {
                maximum = sum
            }
            sum = 0
            continue
        }

        sum += value
    }

    return maximum
}

const partTwo = (values: number[]) => {

}

console.log(partOne(values))
console.log(partTwo(values))
