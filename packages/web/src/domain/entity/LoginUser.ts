/** 登录用户的个人信息 */

export class LoginUser {
  private _name = '';
  get name() {
    return this._name;
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  static createEmpty(): LoginUser {
    return new LoginUser();
  }
}
