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

export type ChatMessage = {
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
};

/** Messages with an user or an group */
export type ChatMessagesRecord = {
  messages: ChatMessage[];
  unread: number; // 未读消息数
};

export type LastMessagesRequestBody = {
  contactKeys: string[]; // connection of two user ids or a group id
};

export type HistoryChatMessagesRequestBody = {
  contactKey: string;
  offset: number;
};

export type HistoryChatMessagesResponse = ChatMessage[];

export type FileChatMessageItem = {
  type: ChatMessageFormat.file;
  data: string;
  name: string;
};

export type VideoChatMessageItem = {
  type: ChatMessageFormat.video;
  data: string;
};

export type ImageChatMessageItem = {
  type: ChatMessageFormat.image;
  data: string;
};

export type AudioChatMessageItem = {
  type: ChatMessageFormat.audio;
  data: string;
};

export type TextChatMessageItem = {
  type: ChatMessageFormat.text;
  data: string;
};

export type ChatMessageItem =
  | VideoChatMessageItem
  | FileChatMessageItem
  | TextChatMessageItem
  | ImageChatMessageItem
  | AudioChatMessageItem;

export type SendChatMessageBody = {
  to: string;
  items: ChatMessageItem[];
};

export type UpdateHistoryRequestBody = {
  contactKey: string;
  messageId: string;
};

export type UpdateHistoryResponse = {
  success: boolean;
};

/** Key is connection of two user ids or a group id */
export type LastMessagesResponse = Record<string, ChatMessagesRecord>;
