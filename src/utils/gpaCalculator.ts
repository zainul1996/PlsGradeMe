interface Module {
    points: number;
    credits: number;
}

/**
 * Calculate the GPA of a student based on the grades
 *
 * @param modules - An array of objects containing the points and credits of each grade
 * @param currentCGPA - The current cumulative GPA of the student
 * @param currentCU - The current cumulative units of the student
 *
 * @returns The cumulative GPA of the student
 */
export function calculateGPA(modules: Module[], currentCGPA: number = 0, currentCU: number = 0) {

    // If the currentCGPA and currentCU are provided, calculate the current cumulative GPA (insert into modules array)
    if (currentCGPA && currentCU) {
        modules.push({
            points: currentCGPA,
            credits: currentCU
        });
    }

    // Add all the points and credits and return an object with the total points and credits
    const acc = modules.reduce((acc, grade) => {
        acc.totalPoints += grade.points * grade.credits;
        acc.totalCredits += grade.credits;
        return acc;
    }, {
        totalPoints: 0,
        totalCredits: 0
    })

    return (acc.totalPoints / acc.totalCredits).toFixed(3);
}

/**
 * Calculate the target GPA of a student
 * @param currentCPGA - The current cumulative GPA of the student
 * @param currentCU - The current cumulative units of the student
 * @param targetGPA - The target GPA of the student
 * @param targetCU - The target cumulative units of the student
 *
 * @returns The minimum GPA required to achieve the target GPA
 */
export function getTargetGPA(currentCPGA: number, currentCU: number, targetGPA: number, targetCU: number) {
    return (((targetGPA * targetCU) - (currentCPGA * currentCU)) / (targetCU - currentCU)).toFixed(3);
}
