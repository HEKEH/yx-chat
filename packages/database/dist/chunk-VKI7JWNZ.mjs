// src/model/chat-message.ts
import {
  ChatMessageFormat,
  ChatMessageFormatList
} from "@yx-chat/shared/types";
import { Schema, model } from "mongoose";
var MAX_TEXT_MESSAGE_LENGTH = process.env.PUBLIC_MAX_MESSAGE_LENGTH ? Number(process.env.PUBLIC_MAX_MESSAGE_LENGTH) : 2e3;
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
  /** ChatItems */
  items: {
    type: [
      {
        type: {
          type: String,
          enum: ChatMessageFormatList,
          required: true
        },
        data: { type: String, required: true }
      }
    ],
    default: [],
    validate: [
      {
        validator: function(v) {
          let length = 0;
          for (const item of v) {
            if (item.type === ChatMessageFormat.text) {
              length += item.data.length;
              if (length > MAX_TEXT_MESSAGE_LENGTH) {
                return false;
              }
            }
          }
          return true;
        },
        message: () => `Content exceeds maximum length of ${MAX_TEXT_MESSAGE_LENGTH}`
      }
    ],
    required: true
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
