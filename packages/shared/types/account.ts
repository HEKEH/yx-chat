import { Friend, Group } from './contact';
import { User } from './user';

export interface Environment {
  /** 客户端系统 */
  os: string;
  /** 客户端浏览器 */
  browser: string;
  /** 客户端环境信息 */
  environment: string;
}

export interface LoginData extends Environment {
  username: string;
  password: string;
}

export type RegisterData = LoginData;

export interface LoginSuccessResponse extends User {
  token?: string;
  friends: Friend[];
  groups: Group[];
}
