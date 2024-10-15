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

// types/index.ts
var types_exports = {};
__export(types_exports, {
  AccountRequestType: () => AccountRequestType,
  ChatMessageFormat: () => ChatMessageFormat,
  ChatMessageFormatList: () => ChatMessageFormatList,
  ChatMessageRequestType: () => ChatMessageRequestType,
  ContactRequestType: () => ContactRequestType,
  NotificationType: () => NotificationType,
  RESPONSE_CODE: () => RESPONSE_CODE,
  ServerMessageType: () => ServerMessageType,
  SystemRequestType: () => SystemRequestType
});
module.exports = __toCommonJS(types_exports);

// types/account.ts
var AccountRequestType = /* @__PURE__ */ ((AccountRequestType2) => {
  AccountRequestType2["login"] = "login";
  AccountRequestType2["loginByToken"] = "loginByToken";
  AccountRequestType2["register"] = "register";
  return AccountRequestType2;
})(AccountRequestType || {});

// utils/enum.ts
function enum2ValueArray(obj) {
  const values = Object.values(obj);
  return values.slice(values.length / 2);
}

// types/chat.ts
var ChatMessageRequestType = /* @__PURE__ */ ((ChatMessageRequestType2) => {
  ChatMessageRequestType2["getLastChatMessages"] = "getLastChatMessages";
  ChatMessageRequestType2["getHistoryChatMessages"] = "getHistoryChatMessages";
  ChatMessageRequestType2["sendChatMessage"] = "sendMessage";
  ChatMessageRequestType2["updateHistory"] = "updateHistory";
  return ChatMessageRequestType2;
})(ChatMessageRequestType || {});
var ChatMessageFormat = /* @__PURE__ */ ((ChatMessageFormat2) => {
  ChatMessageFormat2["text"] = "text";
  return ChatMessageFormat2;
})(ChatMessageFormat || {});
var ChatMessageFormatList = enum2ValueArray(ChatMessageFormat);

// types/notification.ts
var NotificationType = /* @__PURE__ */ ((NotificationType2) => {
  NotificationType2["FriendAddNotification"] = "FriendAddNotification";
  return NotificationType2;
})(NotificationType || {});

// types/contact.ts
var ContactRequestType = /* @__PURE__ */ ((ContactRequestType2) => {
  ContactRequestType2["createGroup"] = "createGroup";
  ContactRequestType2["joinGroup"] = "addGroup";
  ContactRequestType2["sendAddFriendRequest"] = "sendFriendAddRequest";
  ContactRequestType2["rejectAddFriendRequest"] = "rejectAddFriendRequest";
  ContactRequestType2["acceptAddFriendRequest"] = "acceptAddFriendRequest";
  return ContactRequestType2;
})(ContactRequestType || {});

// types/server-message.ts
var ServerMessageType = /* @__PURE__ */ ((ServerMessageType2) => {
  ServerMessageType2["chat"] = "chat";
  ServerMessageType2["notification"] = "notification";
  ServerMessageType2["friendAccepted"] = "friendAccepted";
  return ServerMessageType2;
})(ServerMessageType || {});

// types/system.ts
var SystemRequestType = /* @__PURE__ */ ((SystemRequestType2) => {
  SystemRequestType2["searchUsersAndGroups"] = "searchUsersAndGroups";
  return SystemRequestType2;
})(SystemRequestType || {});

// types/response.ts
var RESPONSE_CODE = /* @__PURE__ */ ((RESPONSE_CODE2) => {
  RESPONSE_CODE2[RESPONSE_CODE2["SUCCESS"] = 0] = "SUCCESS";
  RESPONSE_CODE2[RESPONSE_CODE2["BIZ_ERROR"] = 1] = "BIZ_ERROR";
  RESPONSE_CODE2[RESPONSE_CODE2["SERVER_ERROR"] = 2] = "SERVER_ERROR";
  return RESPONSE_CODE2;
})(RESPONSE_CODE || {});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AccountRequestType,
  ChatMessageFormat,
  ChatMessageFormatList,
  ChatMessageRequestType,
  ContactRequestType,
  NotificationType,
  RESPONSE_CODE,
  ServerMessageType,
  SystemRequestType
});
