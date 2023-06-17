/** 登录用户的个人信息 */

export class UserInfo {
  private _name = '';
  get name() {
    return this._name;
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  static createEmpty(): UserInfo {
    return new UserInfo();
  }
}
