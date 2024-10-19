import mongoose__default, { ConnectOptions } from 'mongoose';
export { ChatMessageDocument, ChatMessageModel } from './model/chat-message.mjs';
export { FriendDocument, FriendModel } from './model/friend.mjs';
export { FriendAddRequestDocument, FriendAddRequestModel } from './model/friend-add-request.mjs';
export { GroupDocument, GroupModel } from './model/group.mjs';
export { HistoryDocument, HistoryModel, createOrUpdateHistory } from './model/history.mjs';
export { SocketDocument, SocketModel } from './model/socket.mjs';
export { UserDocument, UserModel } from './model/user.mjs';
import '@yx-chat/shared/types';

declare function initMongoDB(options?: ConnectOptions): Promise<typeof mongoose__default | null>;

export { initMongoDB };
