function getSidePages(values: Array<number>, referencialValue: number): Array<number> {
  const indexOfParentValue = values.indexOf(referencialValue);

  if (indexOfParentValue < 0) {
    throw new Error('Referencecial value does not exist in an array');
  }

  if (values.length <= 3) {
    return values;
  }

  if (indexOfParentValue === 0) {
    return [referencialValue, values[indexOfParentValue + 1], values[indexOfParentValue + 2]];
  }

  if (indexOfParentValue === values.length - 1) {
    return [values[indexOfParentValue - 2], values[indexOfParentValue - 1], referencialValue];
  }

  return [values[indexOfParentValue - 1], referencialValue, values[indexOfParentValue + 1]];
}

export default getSidePages;
