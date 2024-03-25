/**
 * This file is a wrapper to the GPAData.ts file. These include getting points, grades, and schools by name or by index and whatnot
 */
import { School } from '@components/contexts/GPAContextProvider';

/**
 * Get a grade by the points (e.g. 4.0 -> A+)
 * @param school
 * @param points
 */
export function getGradeByPoints(school: School, points: number) {
  return Object.entries(school.grades).find(([grade, p]) => p === points)?.[0];
}

/**
 * Get the points by the grade (e.g. A+ -> 4.0)
 * @param school
 * @param grade
 */
export function getPointsByGrade(school: School, grade: string): number {
  return school.grades[grade as keyof School['grades']] || 0;
}
