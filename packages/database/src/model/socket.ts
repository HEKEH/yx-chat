import { Schema, model, Document } from 'mongoose';
import { UserDocument } from './user';

const SocketSchema = new Schema({
  createTime: { type: Date, default: Date.now },

  id: {
    type: String,
    unique: true,
    index: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  ip: String,
  os: {
    type: String,
    default: '',
  },
  browser: {
    type: String,
    default: '',
  },
  environment: {
    type: String,
    default: '',
  },
});

export interface SocketDocument extends Document {
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
export const SocketModel = model<SocketDocument>('Socket', SocketSchema);
