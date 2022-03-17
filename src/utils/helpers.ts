export function moveItemInArray<T>(array: Array<T>, fromIndex: number, toIndex: number) {
  const item = array.splice(fromIndex, 1)[0]
  array.splice(toIndex, 0, item)
}
