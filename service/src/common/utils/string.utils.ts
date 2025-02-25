export function getRandomString(length: number, prefix = ''): string {
  const str = 'abcdefghijklopqrstuvwxyzABCDEFGHIJKLOPQRSTUVWXYZ0123456789';
  return prefix.concat(
    [...new Array(length)]
      .map(() => str[Math.floor(Math.random() * str.length + 1)])
      .join(''),
  );
}
