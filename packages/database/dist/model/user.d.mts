import * as mongoose from 'mongoose';
import { Document } from 'mongoose';

interface UserDocument extends Document {
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
declare const UserModel: mongoose.Model<UserDocument, {}, {}, {}, Document<unknown, {}, UserDocument> & UserDocument & {
    _id: mongoose.Types.ObjectId;
}, any>;

export { UserDocument, UserModel };
