import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { ChatMessageItem } from '@yx-chat/shared/types';
import { UserDocument } from './user.mjs';

interface ChatMessageDocument extends Document {
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
declare const ChatMessageModel: mongoose.Model<ChatMessageDocument, {}, {}, {}, Document<unknown, {}, ChatMessageDocument> & ChatMessageDocument & {
    _id: mongoose.Types.ObjectId;
}, any>;

export { ChatMessageDocument, ChatMessageModel };
