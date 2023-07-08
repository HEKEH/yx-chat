import GlobalState from '../../entity/GlobalState';
import { GlobalServiceModulesAPI } from '../global-service-modules-api';
import { ServiceModule } from '../base/service-module';
import { SelectMenu } from './select-menu';

export type GlobalServiceModuleAPI = {
  selectMenu: typeof SelectMenu.prototype.execute;
  state: GlobalState;
};

export const globalServiceModule: ServiceModule<GlobalServiceModulesAPI> = {
  services: {
    selectMenu: SelectMenu,
  },
  repos: {
    state: new GlobalState(),
  },
};
