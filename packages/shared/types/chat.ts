export enum ChatMessageRequestType {
  /** get last messages by contacts' ids */
  getLastMessages = 'getLastMessages',
  /** send chat message */
  sendChatMessage = 'sendMessage',
}

export enum ChatMessageFormat {
  text = 'text',
}

export type ChatMessage = {
  content: string;
  createTime: string;
  deleted: boolean;
  type: ChatMessageFormat;
  id: string;
  from: {
    id: string; // user id
    username: string;
    avatar: string;
  };
  to?: string;
};

/** Messages with an user or an group */
export type ChatMessagesRecord = {
  messages: ChatMessage[];
  unread: number; // 未读消息数
};

export type LastMessagesRequestBody = {
  contactKeys: string[]; // connection of two user ids or a group id
};

export type SendChatMessageBody = {
  content: string;
  type: ChatMessageFormat;
  to: string;
};

/** Key is connection of two user ids or a group id */
export type LastMessagesResponse = Record<string, ChatMessagesRecord>;
