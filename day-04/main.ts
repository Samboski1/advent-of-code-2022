export const partOne = (values: string[]) => {
    const assignments = values.map(assignment => {
        return assignment.split(',').map(elves => elves.split('-').map(num => parseInt(num)))
    })

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
