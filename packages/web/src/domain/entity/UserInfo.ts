/** 登录用户的个人信息 */

export class UserInfo {
    private _name: string = "";
    get name() {
        return this._name;
    }
    private constructor() { }
    static createEmpty(): UserInfo {
        return new UserInfo();
    }
};
