import * as mongoose from 'mongoose';
import { Document } from 'mongoose';

interface HistoryDocument extends Document {
    /** user id */
    user: string;
    /** linkman id */
    linkman: string;
    /** last read message id */
    message: string;
}
declare const HistoryModel: mongoose.Model<HistoryDocument, {}, {}, {}, Document<unknown, {}, HistoryDocument> & HistoryDocument & {
    _id: mongoose.Types.ObjectId;
}, any>;
declare function createOrUpdateHistory(data: {
    user: string;
    linkman: string;
    message: string;
}): Promise<void>;

export { HistoryDocument, HistoryModel, createOrUpdateHistory };
