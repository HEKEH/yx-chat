import { Friend, Group } from './contact.js';
import { Notification } from './notification.js';
import { UserBasicInfo } from './user.js';
import './chat.js';

declare enum AccountRequestType {
    login = "login",
    loginByToken = "loginByToken",
    register = "register"
}
interface Environment {
    /** 客户端系统 */
    os: string;
    /** 客户端浏览器 */
    browser: string;
    /** 客户端环境信息 */
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

export { AccountRequestType, Environment, LoginByTokenRequestBody, LoginRequestBody, LoginSuccessResponse, RegisterRequestBody };
