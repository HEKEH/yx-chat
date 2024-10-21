import { ChatMessage } from './chat.mjs';
import { Friend } from './contact.mjs';
import { Notification } from './notification.mjs';
import './common.mjs';

declare enum ServerMessageType {
    chat = "chat",
    notification = "notification",
    friendAccepted = "friendAccepted"
}
type ServerMessage = {
    type: ServerMessageType.chat;
    data: ChatMessage;
} | {
    type: ServerMessageType.notification;
    data: Notification;
} | {
    type: ServerMessageType.friendAccepted;
    data: Friend;
};

export { ServerMessage, ServerMessageType };
