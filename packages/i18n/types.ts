export interface I18nMessage {
  account: {
    login: string;
    register: string;
    username: string;
    password: string;
    confirmPassword: string;
    logoutConfirm: string;
  };
  server: {
    connectError: string;
    disconnect: string;
  };
  common: {
    sourceCode: string;
    language: string;
  };
  setting: {
    general: string;
    theme: string;
  };
  style: {
    theme: {
      default: string;
      cool: string;
    };
  };
}

export type Locale = 'en' | 'zh-cn';

export const SUPPORT_LOCALES: Locale[] = ['en', 'zh-cn'];
