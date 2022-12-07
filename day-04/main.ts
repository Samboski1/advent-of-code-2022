const parseAssignments = (values: string[]) => {
    return values.map(assignment => {
        return assignment.split(',').map(elves => elves.split('-').map(num => parseInt(num)))
    })
}

export const partOne = (values: string[]) => {
    const assignments = parseAssignments(values)

    let count = 0

    for (const assignment of assignments) {
        // first elf
        if (assignment[0][0] >= assignment[1][0] && assignment[0][1] <= assignment[1][1]) {
            count += 1
            continue
        }

        // second elf
        if (assignment[1][0] >= assignment[0][0] && assignment[1][1] <= assignment[0][1]) {
            count += 1
        }
    }

    return count
}

export const partTwo = (values: string[]) => {
    let count = 0

    const assignments = parseAssignments(values).map(assignment => {
        return [
            [...Array(assignment[0][1] - assignment[0][0] + 1).keys()].map(x => x + assignment[0][0]),
            [...Array(assignment[1][1] - assignment[1][0] + 1).keys()].map(x => x + assignment[1][0]),
        ]
    })

    for (const assignment of assignments) {
        if (assignment[0].filter(element => assignment[1].includes(element)).length > 0) {
            count += 1
        }
    }

    return count
}
