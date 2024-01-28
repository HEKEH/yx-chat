import { Document, Schema, model } from 'mongoose';
import { UserDocument } from './user';

const FriendAddRequestSchema = new Schema({
  createTime: { type: Date, default: Date.now },

  from: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  to: {
    type: Schema.Types.ObjectId,
    required: true,
    index: true,
    ref: 'User',
  },
  message: {
    type: String,
    default: '',
  },
  received: {
    type: Boolean,
  },
  /** finished, then soft deleted */
  deleted: {
    type: Boolean,
    default: false,
  },
});

export interface FriendAddRequestDocument extends Document {
  from: UserDocument | string;
  to: UserDocument | string;
  /** Not used yet */
  message: string;
  createTime: Date;
  /** receive or reject */
  received?: boolean;
  /** Has it been deleted */
  deleted: boolean;
}

/**
 * 好友请求消息
 */
const FriendAddRequestModel = model<FriendAddRequestDocument>(
  'FriendAddRequest',
  FriendAddRequestSchema,
);

export default FriendAddRequestModel;
