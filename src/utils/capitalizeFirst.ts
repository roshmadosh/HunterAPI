export const capitalizeFirstLetters = (str: string) => {
  const replaceBigSpaces = str.trim().replace(/\s\s+/, ' ');
  const strArray = replaceBigSpaces.split(' ');
  const updated = strArray.map(word => word[0].toUpperCase() + word.substring(1));
  return updated.join(' ');
}