import mongoose__default, { ConnectOptions } from 'mongoose';
export { ChatMessageDocument, ChatMessageModel } from './model/chat-message.js';
export { FriendDocument, FriendModel } from './model/friend.js';
export { FriendAddRequestDocument, FriendAddRequestModel } from './model/friend-add-request.js';
export { GroupDocument, GroupModel } from './model/group.js';
export { HistoryDocument, HistoryModel, createOrUpdateHistory } from './model/history.js';
export { SocketDocument, SocketModel } from './model/socket.js';
export { UserDocument, UserModel } from './model/user.js';
import '@yx-chat/shared/types';

declare function initMongoDB(options?: ConnectOptions): Promise<typeof mongoose__default | null>;

export { initMongoDB };
