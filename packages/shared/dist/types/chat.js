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

// types/chat.ts
var chat_exports = {};
__export(chat_exports, {
  ChatMessageFormat: () => ChatMessageFormat,
  ChatMessageFormatList: () => ChatMessageFormatList,
  ChatMessageRequestType: () => ChatMessageRequestType
});
module.exports = __toCommonJS(chat_exports);

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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ChatMessageFormat,
  ChatMessageFormatList,
  ChatMessageRequestType
});
