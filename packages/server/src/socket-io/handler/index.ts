import {
  AccountRequestType,
  ChatMessageRequestType,
} from '@yx-chat/shared/types';
import { SocketContext } from '../context';
import login from './login';
import loginByToken from './login-by-token';
import register from './register';
import getLastChatMessages from './get-last-chat-messages';

export const EventHandlerMap = {
  [AccountRequestType.login]: login,
  [AccountRequestType.loginByToken]: loginByToken,
  [AccountRequestType.register]: register,
  [ChatMessageRequestType.getLastChatMessages]: getLastChatMessages,
};
export type EventHandlerMapType = typeof EventHandlerMap;

export function registerSocketEventHandlers(context: SocketContext) {
  Object.entries(EventHandlerMap).forEach(([eventName, handler]) => {
    context.on(eventName as keyof EventHandlerMapType, handler);
  });
}
