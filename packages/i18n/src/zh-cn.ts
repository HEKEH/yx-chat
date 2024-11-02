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
    personalSetting: '个人信息设置',
    updateAvatar: '修改头像',
    updateUsername: '修改用户名',
    updatePassword: '修改密码',
    pleaseEnterNewPassword: '请输入新密码',
    pleaseEnterConfirmPassword: '请输入确认密码',
    pleaseEnterNewUsername: '请输入新的用户名',
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
    searchNoResult: '未搜索到结果',
    create: '创建',
    search: '搜索',
    add: '添加',
    searchPlaceholder2: '搜索用户/群组',
    toFindNewFriends: '快来发现更多新朋友！',
    confirmToAdd: '确认添加',
    sendFriendRequestSuccess: '发送好友请求成功',
    noNotification: '没有新的通知',
    addYouAsFriend: '请求添加你为好友',
    reject: '拒绝',
    agree: '同意',
    confirm: '确认{text}？',
    confirmUpdate: '确认修改',
    cancel: '取消',
    updateSuccessful: '修改成功',
    send: '发送',
    image: '图片',
    file: '文件',
    video: '视频',
    audio: '音频',
    imageNotFound: '图片未找到',
    download: '下载',
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
    users: '用户',
    notifications: '通知',
    friends: '好友',
    groups: '群组',
    createGroup: '创建群组',
    addFriendOrGroup: '加好友/群组',
    inputGroupName: '请输入群组名称',
    whetherAcceptFriend: '是否同意添加 {username} 为好友？',
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
    fileSizeExceedsLimit: '文件大小超过 {limit}MB 的限制',
    messageLengthExceedsLimit: '消息长度超过 {limit} 的限制',
  },
};
export default cn;
