const defaultSort = (a: any, b: any) => {
  if (a < b) return -1
  if (b < a) return 1
  return 0
}

export const Sorter = {
  DEFAULT: defaultSort,
}
