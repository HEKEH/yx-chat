import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { UserDocument } from './user.mjs';

interface FriendAddRequestDocument extends Document {
    from: UserDocument | string;
    to: UserDocument | string;
    /** Not used yet */
    message: string;
    createTime: Date;
    /** accept or reject */
    accepted?: boolean;
    /** Has it been deleted */
    deleted: boolean;
}
/**
 * 好友请求消息
 */
declare const FriendAddRequestModel: mongoose.Model<FriendAddRequestDocument, {}, {}, {}, Document<unknown, {}, FriendAddRequestDocument> & FriendAddRequestDocument & {
    _id: mongoose.Types.ObjectId;
}, any>;

export { FriendAddRequestDocument, FriendAddRequestModel };
