import { Schema, model, Document } from 'mongoose';
import { NAME_REGEXP } from '@yx-chat/shared/constants';

const GroupSchema = new Schema({
  createTime: { type: Date, default: Date.now },

  name: {
    type: String,
    trim: true,
    unique: true,
    match: NAME_REGEXP,
    index: true,
  },
  avatar: String,
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  isDefault: {
    type: Boolean,
    default: false,
  },
  members: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
});

export interface GroupDocument extends Document {
  /** 群组名 */
  name: string;
  /** 头像 */
  avatar: string;
  /** 创建者 */
  creator: string;
  /** 是否为默认群组 */
  isDefault: boolean;
  /** 成员 */
  members: string[];
  /** 创建时间 */
  createTime: Date;
}

/**
 * Group Model
] */
export const GroupModel = model<GroupDocument>('Group', GroupSchema);
