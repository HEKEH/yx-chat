import { Schema, model, Document } from 'mongoose';

const HistoryScheme = new Schema({
  user: {
    type: String,
    required: true,
  },
  linkman: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});

export interface HistoryDocument extends Document {
  /** user id */
  user: string;

  /** linkman id */
  linkman: string; // TODO: 改名为to

  /** last read message id */
  message: string;
}

const HistoryModel = model<HistoryDocument>('History', HistoryScheme);

export default HistoryModel;

export async function createOrUpdateHistory(data: {
  user: string;
  linkman: string;
  message: string;
}) {
  const { user, linkman, message } = data;
  const history = await HistoryModel.findOne({ user, linkman });
  if (history) {
    history.message = message;
    await history.save();
  } else {
    await HistoryModel.create(data);
  }
}
