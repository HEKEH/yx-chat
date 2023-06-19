import { GlobalModulesAPI } from '../GlobalModulesAPI';
import { BaseService } from '../base/BaseService';

export class Login extends BaseService<GlobalModulesAPI> {
  async execute(): Promise<{
    success: boolean;
    msg?: string;
  }> {
    return {
      success: true,
    };
  }
}
