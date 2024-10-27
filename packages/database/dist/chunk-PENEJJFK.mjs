// src/model/chat-message.ts
import { ChatMessageFormatList } from "@yx-chat/shared/types";
import { Schema, model } from "mongoose";
var MAX_CONTENT_LENGTH = 2048;
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
            length += item.data.length;
            if (length > MAX_CONTENT_LENGTH) {
              return false;
            }
          }
          return true;
        },
        message: () => `Content exceeds maximum length of ${MAX_CONTENT_LENGTH}`
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
