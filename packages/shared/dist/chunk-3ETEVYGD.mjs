import {
  enum2ValueArray
} from "./chunk-4TAFVIFX.mjs";

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

export {
  ChatMessageRequestType,
  ChatMessageFormat,
  ChatMessageFormatList
};
