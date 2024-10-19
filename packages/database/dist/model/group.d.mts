import * as mongoose from 'mongoose';
import { Document } from 'mongoose';

interface GroupDocument extends Document {
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
declare const GroupModel: mongoose.Model<GroupDocument, {}, {}, {}, Document<unknown, {}, GroupDocument> & GroupDocument & {
    _id: mongoose.Types.ObjectId;
}, any>;

export { GroupDocument, GroupModel };
