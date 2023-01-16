function getSidePages(
  values: Array<number>,
  referencialValue: number,
  maxLength: number = 3,
): Array<number> {
  const indexOfParentValue = values.indexOf(referencialValue);

  if (indexOfParentValue < 0) {
    throw new Error('Referencecial value does not exist in an array');
  }

  if (values.length <= maxLength) {
    return values;
  }

  if (indexOfParentValue === 0) {
    return values.slice(0, 3);
  }

  if (indexOfParentValue === values.length - 1) {
    return values.slice(-3);
  }

  return values.slice(indexOfParentValue - 1, indexOfParentValue + 2);
}

export default getSidePages;
