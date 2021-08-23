export const stringToNumber = (str: string): number => {
  const result = parseFloat(str)
  if (isNaN(result)) {
    return 0
  } else {
    return result
  }
}
