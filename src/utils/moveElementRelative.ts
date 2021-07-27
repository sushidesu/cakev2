export const moveElementRelative = <T>(
  array: T[],
  targetIndex: number,
  offset: number
): T[] => {
  const newArray = [...array]
  const target = newArray[targetIndex]

  if (offset === 0) {
    return array
  }
  const excluded = sliceLeft(newArray, targetIndex).concat(
    sliceRight(newArray, targetIndex + 1)
  )
  return insert(excluded, targetIndex + offset, target)
}

const sliceLeft = <T>(array: T[], end: number): T[] => {
  if (end < 0) {
    return []
  } else {
    return array.slice(0, end)
  }
}

const insert = <T>(array: T[], index: number, val: T): T[] => {
  return sliceLeft(array, index)
    .concat(val)
    .concat(sliceRight(array, index))
}

const sliceRight = <T>(array: T[], start: number): T[] => {
  if (start < 0) {
    return array.slice(0)
  } else {
    return array.slice(start)
  }
}
