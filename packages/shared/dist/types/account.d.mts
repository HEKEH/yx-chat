import { Friend, Group } from './contact.mjs';
import { Notification } from './notification.mjs';
import { UserBasicInfo } from './user.mjs';
import './chat.mjs';
import './common.mjs';

declare enum AccountRequestType {
    login = "login",
    loginByToken = "loginByToken",
    register = "register",
    updateAvatar = "updateAvatar"
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
interface UpdateAvatarRequestBody {
    avatar: string;
    token: string;
}

export { AccountRequestType, Environment, LoginByTokenRequestBody, LoginRequestBody, LoginSuccessResponse, RegisterRequestBody, UpdateAvatarRequestBody };
