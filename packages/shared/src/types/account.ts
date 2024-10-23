import { Friend, Group } from './contact';
import { Notification } from './notification';
import { UserBasicInfo } from './user';

export enum AccountRequestType {
  login = 'login', // Login account
  loginByToken = 'loginByToken', // Login using token
  register = 'register', // Register account
  updateUserInfo = 'updateUserInfo', // Update user information such as avatar, username, etc.
}

export interface Environment {
  /** Client operating system */
  os: string;
  /** Client browser */
  browser: string;
  /** Client environment information */
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

export interface UpdateUserInfoRequestBody {
  username?: string;
  avatar?: string;
  password?: string;
  token: string;
}
