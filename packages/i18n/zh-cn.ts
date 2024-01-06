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
    create: '创建',
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
    createGroup: '创建群组',
    addFriendOrGroup: '加好友/群组',
    inputGroupName: '请输入群组名称',
  },
  time: {
    today: '今天',
    yesterday: '昨天',
  },
  validate: {
    required: '此项必填',
    maxLength: '长度不能超过{len}个字符',
    minLength: '长度不能少于{len}个字符',
    noWhitespace: '不能包含空格',
    notSameWithPassword: '与密码不一致',
  },
};
export default cn;
