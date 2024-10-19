// src/model/chat-message.ts
import {
  ChatMessageFormat,
  ChatMessageFormatList
} from "@yx-chat/shared/types";
import { Schema, model } from "mongoose";
var ChatMessageSchema = new Schema({
  createTime: { type: Date, default: Date.now },
  from: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  to: {
    type: String,
    index: true
  },
  type: {
    type: String,
    enum: ChatMessageFormatList,
    default: ChatMessageFormat.text
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
var ChatMessageModel = model(
  "Message",
  ChatMessageSchema
);

export {
  ChatMessageModel
};
