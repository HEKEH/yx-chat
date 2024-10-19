import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { UserDocument } from './user.mjs';

interface SocketDocument extends Document {
    /** socket connection id */
    id: string;
    user: UserDocument | string;
    /** ip address */
    ip: string;
    os: string;
    browser: string;
    environment: string;
    createTime: Date;
}
/**
 * Socket Model
 * Socket connection information
 */
declare const SocketModel: mongoose.Model<SocketDocument, {}, {}, {}, Document<unknown, {}, SocketDocument> & SocketDocument & {
    _id: mongoose.Types.ObjectId;
}, any>;

export { SocketDocument, SocketModel };
