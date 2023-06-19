import { LoginUser } from '../../entity/LoginUser';
import { GlobalServiceModulesAPI } from '../GlobalServiceModulesAPI';
import { ServiceModule } from '../base/ServiceModule';
import { Login } from './Login';
import { Register } from './Register';

export type AccountServiceModuleAPI = {
  login: typeof Login.prototype.execute;
  register: typeof Register.prototype.execute;
  loginUser: LoginUser;
};

export const accountServiceModule: ServiceModule<GlobalServiceModulesAPI> = {
  services: {
    login: Login,
    register: Register,
  },
  repos: {
    loginUser: LoginUser.createEmpty(), // 本人的个人信息
  },
};
