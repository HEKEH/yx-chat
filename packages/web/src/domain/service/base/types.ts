export type ModuleAPI = Record<
  string,
  ((...args: unknown[]) => unknown) | object
>;
export type ModulesAPI = Record<string, ModuleAPI>;
