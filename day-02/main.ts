import { join } from 'node:path'
import { readFileSync } from 'fs'

enum Choice {
    Rock = 'Rock',
    Paper = 'Paper',
    Scissors = 'Scissors',
}

const translation = {
    A: Choice.Rock,
    B: Choice.Paper,
    C: Choice.Scissors,
    X: Choice.Rock,
    Y: Choice.Paper,
    Z: Choice.Scissors,
}

const assignPoints = (competitor, me) => {
    if (me === undefined || competitor === undefined) {
        return 0
    }

    let points = 0

    if (me === competitor) {
        points += 3
    }

    if (me === Choice.Rock) {
        points += 1

        if (competitor === Choice.Scissors) {
            points += 6
        }
    } else if (me === Choice.Paper) {
        points += 2

        if (competitor === Choice.Rock) {
            points += 6
        }
    } else if (me === Choice.Scissors) {
        points += 3

        if (competitor === Choice.Paper) {
            points += 6
        }
    }

    return points
}

const values: number[][] = readFileSync(join(__dirname, 'input.txt'), 'utf-8')
    .split('\n')
    .map(input => {
        let hands = input.split(' ')
        return [translation[hands[0]],translation[hands[1]]]
    })

const partOne = (values: number[][]) => {
    const points = values.map(hand => {
        return assignPoints(hand[0], hand[1])
    })

    return points.reduce((acc, current) => {
        return acc + current
    }, 0)
}

console.log(partOne(values))
