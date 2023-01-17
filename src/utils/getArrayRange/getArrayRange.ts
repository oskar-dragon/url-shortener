function getArrayRange<T extends Array<unknown>>(arr: T, start: number, end: number) {
  return arr.slice(start, end) as T;
}

export default getArrayRange;
