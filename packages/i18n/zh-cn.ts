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
    loading: '载入中',
    searchPlaceholder: '搜索好友/群组',
    searchNoResult: '未搜索到内容',
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
  main: {
    chats: '聊天',
    contacts: '联系人',
    friends: '好友',
    groups: '群组',
    createGroup: '发起群聊',
    addFriendOrGroup: '加好友/群组',
  },
  time: {
    today: '今天',
    yesterday: '昨天',
  },
};
export default cn;
