const findStreams = (values: string[], character: number) => {
    let repeatedCharacters = true
    let initialCharacter = character

    const dataStream = values[0].split('')

    while (repeatedCharacters == true) {
        character += 1
        let streamSubset = dataStream.slice(character-(initialCharacter+1), character)
        let deduplicatedStreamLength = [...new Set(streamSubset)].length
        if (streamSubset.length == deduplicatedStreamLength) {
            repeatedCharacters = false
        }
    }

    return character
}

export const partOne = (values: string[]) => {
    return findStreams(values, 3)
}

export const partTwo = (values: string[]) => {
    return findStreams(values, 13)
}
