function excludeDuplicates<T extends Array<string | number>, K extends Array<string | number>>(
  arr1: T,
  arr2: K,
): Array<string | number> {
  const hashMap: { [K: string]: true } = {};
  let shortArr = [];
  let longArr = [];

  const result = [];

  if (arr1.length < arr2.length) {
    shortArr = arr1;
    longArr = arr2;
  } else {
    shortArr = arr2;
    longArr = arr1;
  }

  for (let i = 0; i < shortArr.length; i += 1) {
    hashMap[shortArr[i]] = true;
  }

  for (let i = 0; i < longArr.length; i += 1) {
    if (!hashMap[longArr[i]]) {
      result.push(longArr[i]);
    }
  }

  return result;
}

export default excludeDuplicates;
