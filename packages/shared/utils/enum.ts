export function enum2ValueArray<T>(obj: Record<string, T | string>): T[] {
  const values = Object.values(obj);
  return values as T[];
}
export function enum2KeyArray(obj: Record<string, string | number>): string[] {
  const values = Object.keys(obj);
  return values as string[];
}
