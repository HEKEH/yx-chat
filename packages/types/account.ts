export interface Environment {
  /** 客户端系统 */
  os: string;
  /** 客户端浏览器 */
  browser: string;
  /** 客户端环境信息 */
  environment: string;
}

export interface LoginUserInfo extends Environment {
  username: string;
  password: string;
}

export type RegisterUserInfo = LoginUserInfo;
