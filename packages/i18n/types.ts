export interface I18nMessage {
  account: {
    login: string;
    logout: string;
    register: string;
    username: string;
    password: string;
    confirmPassword: string;
    logoutConfirm: string;
    loginSuccess: string;
    registerSuccess: string;
  };
  server: {
    connectError: string;
    disconnect: string;
  };
  common: {
    sourceCode: string;
    language: string;
    setting: string;
    loading: string;
    searchPlaceholder: string;
    searchNoResult: string;
    create: string;
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
  main: {
    chats: string;
    contacts: string;
    friends: string;
    groups: string;
    createGroup: string;
    addFriendOrGroup: string;
    inputGroupName: string;
  };
  time: {
    today: string;
    yesterday: string;
  };
  validate: {
    required: string;
    maxLength: string;
    minLength: string;
    noWhitespace: string;
    notSameWithPassword: string;
  };
}

export type Locale = 'en' | 'zh-cn';

export const SUPPORT_LOCALES: Locale[] = ['en', 'zh-cn'];
