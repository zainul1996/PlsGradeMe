/**
 * Strip letters from number and returns it as a number
 * @example '123d43d8' -> 123438
 * @example '123.43.8' -> 123.438
 * @param n
 */
export const stripLettersFromNumber = (n: string) => {
  const parts = n.split('.');
  const integerPart = parts.shift()?.replace(/\D/g, '');
  const decimalPart = (parts.join('') || '').replace(/\D/g, '');
  return parseFloat(integerPart + '.' + decimalPart);
};
