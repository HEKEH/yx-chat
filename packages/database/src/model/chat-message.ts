import {
  ChatMessageFormat,
  ChatMessageFormatList,
  ChatMessageItem,
} from '@yx-chat/shared/types';
import { Document, Schema, model } from 'mongoose';
import { UserDocument } from './user';

const MAX_TEXT_MESSAGE_LENGTH = process.env.PUBLIC_MAX_MESSAGE_LENGTH
  ? Number(process.env.PUBLIC_MAX_MESSAGE_LENGTH)
  : 2000;

const ChatMessageSchema = new Schema({
  createTime: { type: Date, default: Date.now },

  from: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  to: {
    type: String,
    index: true,
  },
  /** ChatItems */
  items: {
    type: [
      {
        type: {
          type: String,
          enum: ChatMessageFormatList,
          required: true,
        },
        data: { type: String, required: true },
      },
    ],
    default: [],
    validate: [
      {
        validator: function (v: ChatMessageItem[]) {
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
        message: () =>
          `Content exceeds maximum length of ${MAX_TEXT_MESSAGE_LENGTH}`,
      },
    ],
    required: true,
  },
  deleted: {
    type: Boolean,
    default: false,
  },
});

export interface ChatMessageDocument extends Document {
  /** 发送人 */
  from: string;
  /** 接受者, 发送给群时为群_id, 发送给个人时为俩人的_id按大小序拼接后值 */
  to: UserDocument | string;
  /** 内容, 某些消息类型会存成JSON */
  items: ChatMessageItem[];
  /** 创建时间 */
  createTime: Date;
  /** Has it been deleted */
  deleted: boolean;
}

/**
 * Message Model
 * 聊天消息
 */
export const ChatMessageModel = model<ChatMessageDocument>(
  'Message',
  ChatMessageSchema,
);
