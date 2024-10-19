export { ChatMessageDocument, ChatMessageModel } from './chat-message.js';
export { FriendDocument, FriendModel } from './friend.js';
export { FriendAddRequestDocument, FriendAddRequestModel } from './friend-add-request.js';
export { GroupDocument, GroupModel } from './group.js';
export { HistoryDocument, HistoryModel, createOrUpdateHistory } from './history.js';
export { SocketDocument, SocketModel } from './socket.js';
export { UserDocument, UserModel } from './user.js';
import 'mongoose';
import '@yx-chat/shared/types';
