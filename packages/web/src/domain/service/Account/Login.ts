import { GlobalServiceModulesAPI } from '../GlobalServiceModulesAPI';
import { BaseService } from '../base/BaseService';

export class Login extends BaseService<GlobalServiceModulesAPI> {
  async execute(): Promise<{
    success: boolean;
    msg?: string;
  }> {
    return {
      success: true,
    };
  }
}
