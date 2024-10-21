import { Friend, Group } from './contact';
import { Notification } from './notification';
import { UserBasicInfo } from './user';

export enum AccountRequestType {
  login = 'login', // 登录账号
  loginByToken = 'loginByToken', // 根据token来登录
  register = 'register', // 注册账号
}

export interface Environment {
  /** 客户端系统 */
  os: string;
  /** 客户端浏览器 */
  browser: string;
  /** 客户端环境信息 */
  environment: string;
}

export interface LoginRequestBody extends Environment {
  username: string;
  password: string;
}

export interface LoginByTokenRequestBody extends Environment {
  token: string;
}

export type RegisterRequestBody = LoginRequestBody;

export interface LoginSuccessResponse extends UserBasicInfo {
  token?: string;
  friends: Friend[];
  groups: Group[];
  notifications: Notification[];
}

export interface UpdateAvatarRequestBody {
  avatar: string;
  token: string;
}
