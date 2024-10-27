"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/zh-cn.ts
var zh_cn_exports = {};
__export(zh_cn_exports, {
  default: () => zh_cn_default
});
module.exports = __toCommonJS(zh_cn_exports);
var cn = {
  account: {
    login: "\u767B\u5F55",
    logout: "\u9000\u51FA\u767B\u5F55",
    register: "\u6CE8\u518C",
    username: "\u7528\u6237\u540D",
    password: "\u5BC6\u7801",
    confirmPassword: "\u786E\u8BA4\u5BC6\u7801",
    logoutConfirm: "\u662F\u5426\u8981\u9000\u51FA\u767B\u5F55?",
    loginSuccess: "\u767B\u5F55\u6210\u529F",
    registerSuccess: "\u6CE8\u518C\u6210\u529F",
    personalSetting: "\u4E2A\u4EBA\u4FE1\u606F\u8BBE\u7F6E",
    updateAvatar: "\u4FEE\u6539\u5934\u50CF",
    updateUsername: "\u4FEE\u6539\u7528\u6237\u540D",
    updatePassword: "\u4FEE\u6539\u5BC6\u7801",
    pleaseEnterNewPassword: "\u8BF7\u8F93\u5165\u65B0\u5BC6\u7801",
    pleaseEnterConfirmPassword: "\u8BF7\u8F93\u5165\u786E\u8BA4\u5BC6\u7801",
    pleaseEnterNewUsername: "\u8BF7\u8F93\u5165\u65B0\u7684\u7528\u6237\u540D"
  },
  server: {
    connectError: "\u670D\u52A1\u5668\u8FDE\u63A5\u5931\u8D25",
    disconnect: "\u670D\u52A1\u5668\u8FDE\u63A5\u65AD\u5F00"
  },
  common: {
    sourceCode: "\u6E90\u7801",
    language: "\u8BED\u8A00",
    setting: "\u8BBE\u7F6E",
    loading: "\u8F7D\u5165\u4E2D",
    searchPlaceholder: "\u641C\u7D22\u597D\u53CB/\u7FA4\u7EC4",
    searchNoResult: "\u672A\u641C\u7D22\u5230\u7ED3\u679C",
    create: "\u521B\u5EFA",
    search: "\u641C\u7D22",
    add: "\u6DFB\u52A0",
    searchPlaceholder2: "\u641C\u7D22\u7528\u6237/\u7FA4\u7EC4",
    toFindNewFriends: "\u5FEB\u6765\u53D1\u73B0\u66F4\u591A\u65B0\u670B\u53CB\uFF01",
    confirmToAdd: "\u786E\u8BA4\u6DFB\u52A0",
    sendFriendRequestSuccess: "\u53D1\u9001\u597D\u53CB\u8BF7\u6C42\u6210\u529F",
    noNotification: "\u6CA1\u6709\u65B0\u7684\u901A\u77E5",
    addYouAsFriend: "\u8BF7\u6C42\u6DFB\u52A0\u4F60\u4E3A\u597D\u53CB",
    reject: "\u62D2\u7EDD",
    agree: "\u540C\u610F",
    confirm: "\u786E\u8BA4{text}\uFF1F",
    confirmUpdate: "\u786E\u8BA4\u4FEE\u6539",
    cancel: "\u53D6\u6D88",
    updateSuccessful: "\u4FEE\u6539\u6210\u529F",
    send: "\u53D1\u9001",
    image: "\u56FE\u7247",
    file: "\u6587\u4EF6"
  },
  setting: {
    general: "\u901A\u7528",
    theme: "\u4E3B\u9898"
  },
  style: {
    theme: {
      default: "\u9ED8\u8BA4",
      cool: "\u6E05\u723D"
    }
  },
  main: {
    chats: "\u804A\u5929",
    contacts: "\u8054\u7CFB\u4EBA",
    users: "\u7528\u6237",
    notifications: "\u901A\u77E5",
    friends: "\u597D\u53CB",
    groups: "\u7FA4\u7EC4",
    createGroup: "\u521B\u5EFA\u7FA4\u7EC4",
    addFriendOrGroup: "\u52A0\u597D\u53CB/\u7FA4\u7EC4",
    inputGroupName: "\u8BF7\u8F93\u5165\u7FA4\u7EC4\u540D\u79F0",
    whetherAcceptFriend: "\u662F\u5426\u540C\u610F\u6DFB\u52A0 {username} \u4E3A\u597D\u53CB\uFF1F"
  },
  time: {
    today: "\u4ECA\u5929",
    yesterday: "\u6628\u5929"
  },
  validate: {
    required: "\u6B64\u9879\u5FC5\u586B",
    maxLength: "\u957F\u5EA6\u4E0D\u80FD\u8D85\u8FC7{len}\u4E2A\u5B57\u7B26",
    minLength: "\u957F\u5EA6\u4E0D\u80FD\u5C11\u4E8E{len}\u4E2A\u5B57\u7B26",
    noWhitespace: "\u4E0D\u80FD\u5305\u542B\u7A7A\u683C",
    notSameWithPassword: "\u4E0E\u5BC6\u7801\u4E0D\u4E00\u81F4"
  }
};
var zh_cn_default = cn;
