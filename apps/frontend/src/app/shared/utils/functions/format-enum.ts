export function formatEnumKeys<T extends string>(enumObject: T[] | T) {
  if (Array.isArray(enumObject))
    return Object.keys(enumObject)
      .filter((key) => isNaN(Number(key)))
      .map((key) => key.toLowerCase().replace(/_/g, ' '))
      .map((str) => str.charAt(0).toUpperCase() + str.slice(1));
  else {
    const str = enumObject.toLowerCase().replace(/_/g, ' ');
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}
