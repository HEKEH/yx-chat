declare function enum2ValueArray<T>(obj: Record<string, T | string>): T[];
declare function enum2KeyArray(obj: Record<string, string | number>): string[];

export { enum2KeyArray, enum2ValueArray };
