// reverseMapping reverses the mapping of an object
export function reverseMapping(o: any): any {
  return Object.keys(o).reduce((r: any, k: string) => Object.assign(r, { [o[k]]: k }), {});
}
