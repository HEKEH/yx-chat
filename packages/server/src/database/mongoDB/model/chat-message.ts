import {
  ChatMessageFormat,
  ChatMessageFormatList,
} from '@yx-chat/shared/types';
import { Schema, model, Document } from 'mongoose';

const ChatMessageSchema = new Schema({
  createTime: { type: Date, default: Date.now, index: true },

  from: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  to: {
    type: String,
    index: true,
  },
  type: {
    type: String,
    enum: ChatMessageFormatList,
    default: ChatMessageFormat.text,
  },
  content: {
    type: String,
    default: '',
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
  to: string;
  /** 消息类型 */
  type: ChatMessageFormat;
  /** 内容, 某些消息类型会存成JSON */
  content: string;
  /** 创建时间 */
  createTime: Date;
  /** Has it been deleted */
  deleted: boolean;
}

/**
 * Message Model
 * 聊天消息
 */
const ChatMessageModel = model<ChatMessageDocument>(
  'Message',
  ChatMessageSchema,
);

export default ChatMessageModel;
