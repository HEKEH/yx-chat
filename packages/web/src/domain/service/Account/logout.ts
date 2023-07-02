import { BaseService } from '../base/base-service';
import { GlobalServiceModulesAPI } from '../global-service-modules-api';
import { LocalStorageStore } from '~/infrastructure/local-store/local-storage-store';

export class Logout extends BaseService<GlobalServiceModulesAPI> {
  execute() {
    LocalStorageStore.instance.removeItem('token');
    this.services.account.self.clear();
  }
}
