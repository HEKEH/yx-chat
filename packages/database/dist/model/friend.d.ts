import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { UserDocument } from './user.js';

interface FriendDocument extends Document {
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
declare const FriendModel: mongoose.Model<FriendDocument, {}, {}, {}, Document<unknown, {}, FriendDocument> & FriendDocument & {
    _id: mongoose.Types.ObjectId;
}, any>;

export { FriendDocument, FriendModel };
