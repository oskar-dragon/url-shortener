function getRandomValue<T>(values: T[]): T {
  const randomNumber = Math.floor(Math.random() * values.length);

  return values[randomNumber];
}

export default getRandomValue;
