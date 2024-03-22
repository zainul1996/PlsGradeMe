import { getPointsByGrade } from '@utils/dataHelperFunctions';
import { School } from '@components/contexts/GPAContextProvider';
import { stripLettersFromNumber } from '@utils/stripLettersFromNumber';

export interface Module {
  name: string;
  grade: string;
  credits: number;
}

export interface ModuleWithID extends Module {
  id: string;
}

/**
 * Calculate the GPA of a student based on the grades
 *
 * @param modules - An array of objects containing the points and credits of each grade
 * @param currentCGPA - The current cumulative GPA of the student
 * @param currentCU - The current cumulative units of the student
 * @param school
 *
 * @returns The cumulative GPA of the student
 */
export function calculateGPA(
  modules: Module[],
  currentCGPA: number = 0,
  currentCU: number = 0,
  school: School
) {
  // If the currentCGPA and currentCU are provided, calculate the current cumulative GPA (insert into modules array)
  // Add all the points and credits and return an object with the total points and credits
  const acc = modules.reduce(
    (acc, grade) => {
      const points = getPointsByGrade(school, grade.grade);
      acc.totalPoints += points * grade.credits;
      acc.totalCredits += grade.credits;
      return acc;
    },
    {
      totalPoints: 0,
      totalCredits: 0,
    }
  );

  if (currentCGPA && currentCU) {
    acc.totalPoints += currentCGPA * currentCU;
    acc.totalCredits += currentCU;
  }

  if (isNaN(acc.totalPoints / acc.totalCredits)) {
    return undefined;
  }

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

// TODO: Fix the formula, something's not adding up...
export function getTargetGPA(
  currentCPGA: number,
  currentCU: number,
  targetGPA: number,
  targetCU: number
) {
  const result =
    (targetGPA * (currentCU + targetCU) - currentCPGA * currentCU) / targetCU;
  return Number(result.toFixed(4));
}

// prevGPA = getPreviousGrade().GPA;
// prevCred = getPreviousGrade().Credits;
// nextGPA = getNextGrade().GPA;
// nextCred = getNextGrade().Credits;
// let goalGPA = parseFloat(
//   (
//     (nextGPA * (prevCred + nextCred) - prevGPA * prevCred) /
//     nextCred
//   ).toFixed(4)
// );
// console.log(selectedOption);
// grades = jsonData[selectedOption];
// maxGrade = jsonData[selectedOption][0].Point;
// minGrade = jsonData[selectedOption][grades.length - 1].Point;
//
// $("h2.target").remove();
// console.log(goalGPA);
// console.log(minGrade);
// console.log(maxGrade);
// if (goalGPA >= minGrade && goalGPA <= maxGrade) {
//   $(".grid.target").append(
//     `<h2 class="ui row header target">What you need: ` +
//     goalGPA +
//     `</h2>`
//   );
// } else {
//   $(".grid.target").append(
//     `<h2 class="ui row header target">You need more than 1 Semester to achieve that goal. You can do it ! </h2>`
//   );
// }

export function calculateGoalGPA(
  currentCPGA: number,
  currentCredits: number,
  targetGPA: number,
  targetCredits: number,
  selectedSchool: School
) {
  // Parse all as numbers
  // TODO: Something is WRONG
  currentCPGA = stripLettersFromNumber(currentCPGA.toString());
  currentCredits = stripLettersFromNumber(currentCredits.toString());
  targetGPA = stripLettersFromNumber(targetGPA.toString());
  targetCredits = stripLettersFromNumber(targetCredits.toString());

  let minimumRequiredGPAForNextSem = parseFloat(
    (
      (targetGPA * (currentCredits + targetCredits) -
        currentCPGA * currentCredits) /
      targetCredits
    ).toFixed(4)
  );

  let grades = selectedSchool.grades;
  const gradeValues = Object.values(grades);
  let maxGrade = Math.max(...gradeValues);
  let minGrade = Math.min(...gradeValues);

  if (
    minimumRequiredGPAForNextSem >= minGrade &&
    minimumRequiredGPAForNextSem <= maxGrade
  ) {
    return {
      isAchievable: true,
      goalGPA: minimumRequiredGPAForNextSem,
    };
  } else {
    return {
      isAchievable: false,
      goalGPA: null,
    };
  }
}
