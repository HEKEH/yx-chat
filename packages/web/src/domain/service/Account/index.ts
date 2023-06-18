import { LoginUser } from '../../entity/LoginUser';
import { ServiceModule } from '../base/ServiceModule';
import { Login } from './Login';
export type AccountServiceModuleAPI = {
  login: typeof Login.prototype.execute;
  loginUser: LoginUser;
};
export const accountServiceModule: ServiceModule = {
  services: {
    login: Login,
  },
  repos: {
    loginUser: LoginUser.createEmpty(), // 本人的个人信息
  },
};
