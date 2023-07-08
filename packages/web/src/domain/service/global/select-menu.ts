import { BaseService } from '../base/base-service';
import { GlobalServiceModulesAPI } from '../global-service-modules-api';

export class SelectMenu extends BaseService<GlobalServiceModulesAPI> {
  async execute(menu: 'contact' | 'message'): Promise<void> {
    this.services.global.state.selectedMenu = menu;
  }
}
