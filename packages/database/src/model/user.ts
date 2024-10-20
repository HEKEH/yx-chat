import { Document, Schema, model } from 'mongoose';
import { NAME_REGEXP } from '@yx-chat/shared/constants';

const UserSchema = new Schema({
  createTime: { type: Date, default: Date.now },
  lastLoginTime: { type: Date, default: Date.now },

  username: {
    type: String,
    trim: true,
    unique: true,
    match: NAME_REGEXP,
    index: true,
  },
  password: String,
  avatar: String,
  tag: {
    type: String,
    default: '',
    trim: true,
    match: NAME_REGEXP,
  },
  expressions: [
    {
      type: String,
    },
  ],
  isAdmin: {
    type: Boolean,
    default: false,
  },
  lastLoginIp: String,
});

export interface UserDocument extends Document {
  /** 用户名 */
  username: string;
  /** 加密的密码 */
  password: string;
  /** 头像 */
  avatar: string;
  /** 用户标签 */
  tag: string;
  /** 表情收藏 */
  expressions: string[];
  /** 创建时间 */
  createTime: Date;
  /** 最后登录时间 */
  lastLoginTime: Date;
  isAdmin: boolean;
  /** 最后登录IP */
  lastLoginIp: string;
}

/**
 * User Model
 */
export const UserModel = model<UserDocument>('User', UserSchema);
