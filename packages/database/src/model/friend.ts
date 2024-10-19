import { Document, Schema, model } from 'mongoose';
import { UserDocument } from './user';

const FriendSchema = new Schema({
  createTime: { type: Date, default: Date.now },

  from: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    index: true,
  },
  to: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    index: true,
  },
});

export interface FriendDocument extends Document {
  /** 源用户id */
  from: UserDocument | string;
  /** 目标用户id */
  to: UserDocument | string;
  /** 创建时间 */
  createTime: Date;
}

/**
 * Friend Model
 */
export const FriendModel = model<FriendDocument>('Friend', FriendSchema);
