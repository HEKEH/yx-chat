/** 登录用户的个人信息 */

export class UserInfo {
    private _name: string = "";
    private constructor() { }
    static createEmpty(): UserInfo {
        return new UserInfo();
    }
};
