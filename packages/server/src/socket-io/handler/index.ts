import {
  AccountRequestType,
  ChatMessageRequestType,
  ContactRequestType,
} from '@yx-chat/shared/types';
import { SocketContext } from '../context';
import login from './login';
import loginByToken from './login-by-token';
import register from './register';
import getLastChatMessages from './get-last-chat-messages';
import getHistoryChatMessages from './get-history-chat-messages';
import sendChatMessage from './send-chat-message';
import updateHistory from './update-history';
import createGroup from './create-group';

export const EventHandlerMap = {
  [AccountRequestType.login]: login,
  [AccountRequestType.loginByToken]: loginByToken,
  [AccountRequestType.register]: register,
  [ChatMessageRequestType.getLastChatMessages]: getLastChatMessages,
  [ChatMessageRequestType.getHistoryChatMessages]: getHistoryChatMessages,
  [ChatMessageRequestType.sendChatMessage]: sendChatMessage,
  [ChatMessageRequestType.updateHistory]: updateHistory,
  [ContactRequestType.createGroup]: createGroup,
};
export type EventHandlerMapType = typeof EventHandlerMap;

export function registerSocketEventHandlers(context: SocketContext) {
  Object.entries(EventHandlerMap).forEach(([eventName, handler]) => {
    context.on(eventName as keyof EventHandlerMapType, handler);
  });
}
