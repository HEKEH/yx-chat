import {
  AccountRequestType,
  ChatMessageRequestType,
  ContactRequestType,
  SystemRequestType,
} from '@yx-chat/shared/types';
import { SocketContext } from '../context';
import loginHandler from './login';
import loginByTokenHandler from './login-by-token';
import registerHandler from './register';
import getLastChatMessages from './get-last-chat-messages';
import getHistoryChatMessages from './get-history-chat-messages';
import sendChatMessage from './send-chat-message';
import updateHistory from './update-history';
import createGroup from './create-group';
import joinGroup from './join-group';
import searchUsersAndGroups from './search-users-and-groups';
import sendFriendAddRequest from './send-friend-add-request';
import rejectFriendAddRequest from './reject-friend-add-request';
import acceptFriendAddRequest from './accept-friend-add-request';
import updateUserInfoHandler from './update-user-info';

export const EventHandlerMap = {
  [AccountRequestType.login]: loginHandler,
  [AccountRequestType.loginByToken]: loginByTokenHandler,
  [AccountRequestType.register]: registerHandler,
  [AccountRequestType.updateUserInfo]: updateUserInfoHandler,
  [ChatMessageRequestType.getLastChatMessages]: getLastChatMessages,
  [ChatMessageRequestType.getHistoryChatMessages]: getHistoryChatMessages,
  [ChatMessageRequestType.sendChatMessage]: sendChatMessage,
  [ChatMessageRequestType.updateHistory]: updateHistory,
  [ContactRequestType.createGroup]: createGroup,
  [ContactRequestType.joinGroup]: joinGroup,
  [ContactRequestType.sendAddFriendRequest]: sendFriendAddRequest,
  [ContactRequestType.rejectAddFriendRequest]: rejectFriendAddRequest,
  [ContactRequestType.acceptAddFriendRequest]: acceptFriendAddRequest,
  [SystemRequestType.searchUsersAndGroups]: searchUsersAndGroups,
};
export type EventHandlerMapType = typeof EventHandlerMap;

export function registerSocketEventHandlers(context: SocketContext) {
  Object.entries(EventHandlerMap).forEach(([eventName, handler]) => {
    context.on(eventName as keyof EventHandlerMapType, handler);
  });
}
