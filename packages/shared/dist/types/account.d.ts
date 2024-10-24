import { Friend, Group } from './contact.js';
import { Notification } from './notification.js';
import { UserBasicInfo } from './user.js';
import './chat.js';
import './common.js';

declare enum AccountRequestType {
    login = "login",
    loginByToken = "loginByToken",
    register = "register",
    updateUserInfo = "updateUserInfo"
}
interface Environment {
    /** Client operating system */
    os: string;
    /** Client browser */
    browser: string;
    /** Client environment information */
    environment: string;
}
interface LoginRequestBody extends Environment {
    username: string;
    password: string;
}
interface LoginByTokenRequestBody extends Environment {
    token: string;
}
type RegisterRequestBody = LoginRequestBody;
interface LoginSuccessResponse extends UserBasicInfo {
    token?: string;
    friends: Friend[];
    groups: Group[];
    notifications: Notification[];
}
interface UpdateUserInfoRequestBody {
    username?: string;
    avatar?: string;
    password?: string;
    token: string;
}

export { AccountRequestType, Environment, LoginByTokenRequestBody, LoginRequestBody, LoginSuccessResponse, RegisterRequestBody, UpdateUserInfoRequestBody };
