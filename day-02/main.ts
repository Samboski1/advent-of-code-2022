import { join } from 'node:path'
import { readFileSync } from 'fs'

enum Choice {
    Rock = 'Rock',
    Paper = 'Paper',
    Scissors = 'Scissors',
}

enum Result {
    Win = 'Win',
    Lose = 'Lose',
    Draw = 'Draw',
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

const values: string[] = readFileSync(join(__dirname, 'input.txt'), 'utf-8')
    .split('\n')

const partOne = (values: string[]) => {
    const translation = {
        A: Choice.Rock,
        B: Choice.Paper,
        C: Choice.Scissors,
        X: Choice.Rock,
        Y: Choice.Paper,
        Z: Choice.Scissors,
    }

    const hands = values.map(input => {
        let hands = input.split(' ')
        return [translation[hands[0]],translation[hands[1]]]
    })

    const points = hands.map(hand => {
        return assignPoints(hand[0], hand[1])
    })

    return points.reduce((acc, current) => {
        return acc + current
    }, 0)
}

const partTwo = (values: string[]) => {
    const translation = {
        A: Choice.Rock,
        B: Choice.Paper,
        C: Choice.Scissors,
        X: Result.Lose,
        Y: Result.Draw,
        Z: Result.Win,
    }

    const findMyHand = (opponent, result) => {
        switch (result) {
            case Result.Draw:
                return opponent
            case Result.Win:
                switch (opponent) {
                    case Choice.Rock:
                        return Choice.Paper
                    case Choice.Paper:
                        return Choice.Scissors
                    case Choice.Scissors:
                        return Choice.Rock
                }
            case Result.Lose:
                switch (opponent) {
                    case Choice.Rock:
                        return Choice.Scissors
                    case Choice.Paper:
                        return Choice.Rock
                    case Choice.Scissors:
                        return Choice.Paper
                }
        }
    }

    const hands = values.map(input => {
        let hands = input.split(' ')
        return [translation[hands[0]],translation[hands[1]]]
    })

    let points = 0

    for (const hand of hands) {
        points += assignPoints(hand[0], findMyHand(hand[0], hand[1]))
    }

    return points
}

console.log(partOne(values))
console.log(partTwo(values))
