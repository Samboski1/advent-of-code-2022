export const partOne = (values: string[]) => {
    let character = 3
    let repeatedCharacters = true

    const dataStream = values[0].split('')

    while (repeatedCharacters == true) {
        character += 1
        let streamSubset = dataStream.slice(character-4, character)
        let deduplicatedStreamLength = [...new Set(streamSubset)].length
        if (streamSubset.length == deduplicatedStreamLength) {
            repeatedCharacters = false
        }
    }

    return character
}

export const partTwo = (values: string[]) => {
}
