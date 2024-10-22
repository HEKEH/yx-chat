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

// src/model/chat-message.ts
var chat_message_exports = {};
__export(chat_message_exports, {
  ChatMessageModel: () => ChatMessageModel
});
module.exports = __toCommonJS(chat_message_exports);
var import_types = require("@yx-chat/shared/types");
var import_mongoose = require("mongoose");
var ChatMessageSchema = new import_mongoose.Schema({
  createTime: { type: Date, default: Date.now },
  from: {
    type: import_mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  to: {
    type: String,
    index: true
  },
  type: {
    type: String,
    enum: import_types.ChatMessageFormatList,
    default: import_types.ChatMessageFormat.text
  },
  content: {
    type: String,
    default: ""
  },
  deleted: {
    type: Boolean,
    default: false
  }
});
var ChatMessageModel = (0, import_mongoose.model)(
  "Message",
  ChatMessageSchema
);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ChatMessageModel
});