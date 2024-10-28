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

// src/en.ts
var en_exports = {};
__export(en_exports, {
  default: () => en_default
});
module.exports = __toCommonJS(en_exports);
var en = {
  account: {
    login: "Log In",
    logout: "Log Out",
    register: "Sign Up",
    username: "Username",
    password: "Password",
    confirmPassword: "Confirm Password",
    logoutConfirm: "Are you sure to log out?",
    loginSuccess: "Login successful",
    registerSuccess: "Register successful",
    personalSetting: "Personal Setting",
    updateAvatar: "Update Avatar",
    updateUsername: "Update Username",
    updatePassword: "Update Password",
    pleaseEnterNewPassword: "Please enter new password",
    pleaseEnterConfirmPassword: "Please enter confirm password",
    pleaseEnterNewUsername: "Please enter new username"
  },
  server: {
    connectError: "Server connect error",
    disconnect: "Server disconnect"
  },
  common: {
    sourceCode: "Source code",
    language: "Language",
    setting: "Setting",
    loading: "Loading",
    searchPlaceholder: "Search friends/groups",
    searchNoResult: "No friend/group found",
    create: "Create",
    search: "Search",
    add: "Add",
    searchPlaceholder2: "Search users/groups",
    toFindNewFriends: "To find new friends!",
    confirmToAdd: "Confirm to add",
    sendFriendRequestSuccess: "Successfully send friend request",
    noNotification: "No notification",
    addYouAsFriend: "request to add you as friend",
    reject: "Reject",
    agree: "Agree",
    confirm: "Confirm {text}?",
    confirmUpdate: "Confirm Update",
    cancel: "Cancel",
    updateSuccessful: "Update successful",
    send: "Send",
    image: "Image",
    file: "File"
  },
  setting: {
    general: "General",
    theme: "Theme"
  },
  style: {
    theme: {
      default: "Default",
      cool: "Cool"
    }
  },
  main: {
    chats: "Chats",
    contacts: "Contacts",
    notifications: "Notifications",
    users: "Users",
    friends: "Friends",
    groups: "Groups",
    createGroup: "Create group",
    addFriendOrGroup: "Add friend / Join group",
    inputGroupName: "Input group name",
    whetherAcceptFriend: "Whether accept  {username}  as friend?"
  },
  time: {
    today: "Today",
    yesterday: "Yesterday"
  },
  validate: {
    required: "This field is required",
    maxLength: "The length of this field cannot exceed {len}",
    minLength: "Length of this field cannot be less than {len}",
    noWhitespace: "This field cannot contain whitespace",
    notSameWithPassword: "It's not same with the password",
    fileSizeExceedsLimit: "File size exceeds the limit of {limit} MB",
    messageLengthExceedsLimit: "Message length exceeds the limit of {limit}"
  }
};
var en_default = en;
