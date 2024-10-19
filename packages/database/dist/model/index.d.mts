export { ChatMessageDocument, ChatMessageModel } from './chat-message.mjs';
export { FriendDocument, FriendModel } from './friend.mjs';
export { FriendAddRequestDocument, FriendAddRequestModel } from './friend-add-request.mjs';
export { GroupDocument, GroupModel } from './group.mjs';
export { HistoryDocument, HistoryModel, createOrUpdateHistory } from './history.mjs';
export { SocketDocument, SocketModel } from './socket.mjs';
export { UserDocument, UserModel } from './user.mjs';
import 'mongoose';
import '@yx-chat/shared/types';
