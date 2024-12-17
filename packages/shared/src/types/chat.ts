import { enum2ValueArray } from '../utils';

export enum ChatMessageRequestType {
  /** get last messages by contacts' ids */
  getLastChatMessages = 'getLastChatMessages',
  getHistoryChatMessages = 'getHistoryChatMessages',
  /** send chat message */
  sendChatMessage = 'sendMessage',
  updateHistory = 'updateHistory',
}

export enum ChatMessageFormat {
  // text message
  text = 'text',
  image = 'image',
  video = 'video',

  file = 'file',
  audio = 'audio',
}

export const ChatMessageFormatList: ChatMessageFormat[] =
  enum2ValueArray(ChatMessageFormat);

export interface ChatMessage {
  items: ChatMessageItem[];
  createTime: string;
  deleted: boolean;
  id: string;
  from: {
    id: string; // user id
    username: string;
    avatar: string;
  };
  to: string;
}

/** Messages with an user or an group */
export interface ChatMessagesRecord {
  messages: ChatMessage[];
  unread: number; // 未读消息数
}

export interface LastMessagesRequestBody {
  contactKeys: string[]; // connection of two user ids or a group id
}

export interface HistoryChatMessagesRequestBody {
  contactKey: string;
  offset: number;
}

export type HistoryChatMessagesResponse = ChatMessage[];

export interface FileChatMessageItem {
  type: ChatMessageFormat.file;
  data: string;
  name: string;
}

export interface VideoChatMessageItem {
  type: ChatMessageFormat.video;
  data: string;
}

export interface ImageChatMessageItem {
  type: ChatMessageFormat.image;
  data: string;
}

export interface AudioChatMessageItem {
  type: ChatMessageFormat.audio;
  data: string;
}

export interface TextChatMessageItem {
  type: ChatMessageFormat.text;
  data: string;
}

export type ChatMessageItem =
  | VideoChatMessageItem
  | FileChatMessageItem
  | TextChatMessageItem
  | ImageChatMessageItem
  | AudioChatMessageItem;

export interface SendChatMessageBody {
  to: string;
  items: ChatMessageItem[];
}

export interface UpdateHistoryRequestBody {
  contactKey: string;
  messageId: string;
}

export interface UpdateHistoryResponse {
  success: boolean;
}

/** Key is connection of two user ids or a group id */
export type LastMessagesResponse = Record<string, ChatMessagesRecord>;
