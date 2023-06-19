export type ServiceModuleAPI = Record<
  string,
  ((...args: unknown[]) => unknown) | object
>;
export type ServiceModulesAPI = Record<string, ServiceModuleAPI>;
