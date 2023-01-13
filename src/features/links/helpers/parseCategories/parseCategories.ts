function parseCategories(categories: Array<string>, limit: number): Array<string> {
  const result: Array<string> = [];

  for (let i = 0; i < limit; i += 1) {
    if (categories[i]) {
      result.push(categories[i]);
    }
  }

  if (categories.length > limit) {
    const numOfRestCategories = categories.length - limit;
    result.push(`+${numOfRestCategories.toString()}`);
  }

  return result;
}

export default parseCategories;
