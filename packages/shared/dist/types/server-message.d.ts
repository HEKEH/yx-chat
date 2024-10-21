import { ChatMessage } from './chat.js';
import { Friend } from './contact.js';
import { Notification } from './notification.js';
import './common.js';

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
