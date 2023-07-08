import type { AccountServiceModuleAPI } from './account';
import type { GlobalServiceModuleAPI } from './global';

export type GlobalServiceModulesAPI = {
  account: AccountServiceModuleAPI;
  global: GlobalServiceModuleAPI;
};
