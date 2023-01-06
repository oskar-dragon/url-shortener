function getKeys<Obj extends { [K: string]: unknown }>(obj: Obj): (keyof Obj)[] {
  return Object.keys(obj) as (keyof Obj)[];
}

export default getKeys;
