import { Self } from '../../entity/Self';
import { GlobalServiceModulesAPI } from '../global-service-modules-api';
import { ServiceModule } from '../base/service-module';
import { Login } from './login';
import { LoginByToken } from './login-by-token';
import { Register } from './register';

export type AccountServiceModuleAPI = {
  login: typeof Login.prototype.execute;
  loginByToken: typeof LoginByToken.prototype.execute;
  register: typeof Register.prototype.execute;
  self: Self;
};

export const accountServiceModule: ServiceModule<GlobalServiceModulesAPI> = {
  services: {
    login: Login,
    loginByToken: LoginByToken,
    register: Register,
  },
  repos: {
    self: Self.createEmpty(), // 当前登录用户的个人信息
  },
};
