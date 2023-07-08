import { I18nMessage } from './types';

const cn: I18nMessage = {
  account: {
    login: '登录',
    logout: '退出登录',
    register: '注册',
    username: '用户名',
    password: '密码',
    confirmPassword: '确认密码',
    logoutConfirm: '是否要退出登录?',
    loginSuccess: '登录成功',
    registerSuccess: '注册成功',
  },
  server: {
    connectError: '服务器连接失败',
    disconnect: '服务器连接断开',
  },
  common: {
    sourceCode: '源码',
    language: '语言',
    setting: '设置',
    message: '消息',
    contact: '联系人',
  },
  setting: {
    general: '通用',
    theme: '主题',
  },
  style: {
    theme: {
      default: '默认',
      cool: '清爽',
    },
  },
};
export default cn;
