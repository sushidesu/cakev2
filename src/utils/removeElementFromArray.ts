export const removeElementFromArray = <T>(array: T[], index: number): T[] => {
  return array.slice(0, index).concat(array.slice(index + 1))
}
