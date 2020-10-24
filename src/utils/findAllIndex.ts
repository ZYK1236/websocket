export const findIndex = (arr: Array<number>, target: number, res = []) => {
  let tempRes = res
  if (arr.indexOf(target) !== -1) {
    tempRes.push(arr.indexOf(target))
    arr.slice(arr.indexOf(target))
    return findIndex(arr, target, tempRes)
  } else return tempRes
}
