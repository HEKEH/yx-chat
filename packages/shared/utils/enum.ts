export function enum2ValueArray<T>(obj: Record<string, T | string>): T[] {
  const values = Object.values(obj);
  return values.slice(values.length / 2) as T[]; // last half is values
}
export function enum2KeyArray(obj: Record<string, string | number>): string[] {
  const values = Object.values(obj);
  return values.slice(0, values.length / 2) as string[]; // first half is keys
}
