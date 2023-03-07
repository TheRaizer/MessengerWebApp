export const truncateString = (str: string, length: number): string => {
  if (str.length > length) {
    return str.slice(0, length) + '...';
  } else {
    return str;
  }
};
