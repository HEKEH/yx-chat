import { LoginUser } from '../../entity/LoginUser';
import { GlobalServiceModulesAPI } from '../GlobalServiceModulesAPI';
import { ServiceModule } from '../base/ServiceModule';
import { Login } from './Login';
import { LoginByToken } from './LoginByToken';
import { Register } from './Register';

export type AccountServiceModuleAPI = {
  login: typeof Login.prototype.execute;
  loginByToken: typeof LoginByToken.prototype.execute;
  register: typeof Register.prototype.execute;
  loginUser: LoginUser;
};

export const accountServiceModule: ServiceModule<GlobalServiceModulesAPI> = {
  services: {
    login: Login,
    loginByToken: LoginByToken,
    register: Register,
  },
  repos: {
    loginUser: LoginUser.createEmpty(), // 当前登录用户的个人信息
  },
};
