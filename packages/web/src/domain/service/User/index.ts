import { UserInfo } from '../../entity/UserInfo';
import { ServiceModule } from '../base/ServiceModule';
import { Login } from './Login';
export type userServiceModuleAPI = {
  login: typeof Login.prototype.execute;
  me: UserInfo;
};
export const userServiceModule: ServiceModule = {
  services: {
    login: Login,
  },
  repos: {
    me: UserInfo.createEmpty(), // 本人的个人信息
  },
};
