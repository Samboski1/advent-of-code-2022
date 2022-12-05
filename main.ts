import { join } from 'node:path'
import { existsSync, readFileSync, writeFileSync } from 'fs'

const dayNumber = process.argv[2]

console.log(`Running day ${dayNumber}`)

const getData = async (day) => {
    const cacheFile = join('.cache', `day-${day}.txt`)
    if (existsSync(cacheFile)) {
        return readFileSync(cacheFile, 'utf-8')
    } else {
        console.log('Fetching from Advent Of Code')
        const response = await fetch(`https://adventofcode.com/2022/day/${day}/input`, {
            headers: {
                Cookie: `session=${process.env.AOC_SESSION_TOKEN}`,
                'User-Agent': 'https://github.com/alexmuller/advent-of-code-2022'
            }
        })

        if (!response.ok) {
            throw new Error('Bad response from Advent Of Code')
        }

        const fileContents = await response.text()
        writeFileSync(cacheFile, fileContents)
        return fileContents
    }
}

const data = (await getData(dayNumber)).split('\n');

if (data[data.length - 1] === '') {
    data.pop()
}

const dayCode = await import(`./day-${('00'+dayNumber).slice(-2)}/main.js`)

console.log(dayCode.partOne(data))

export {}
