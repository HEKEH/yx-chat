export enum ChatMessageRequestType {
  /** get last messages by contacts' ids */
  getLastMessages = 'getLinkmansLastMessagesV2',
}

export enum ChatMessageFormat {
  text = 'text',
}

export type ChatMessage = {
  content: string;
  createTime: string;
  deleted: boolean;
  type: ChatMessageFormat;
  _id: string;
  from: {
    _id: string; // user id
    username: string;
    avatar: string;
  };
};

/** Messages with an user or an group */
export type ChatMessagesRecord = {
  messages: ChatMessage[];
  unread: number; // 未读消息数
};

export type LastMessagesRequestBody = {
  linkmans: string[]; // connection of two user ids or a group id
};

/** Key is connection of two user ids or a group id */
export type LastMessagesResponse = Record<string, ChatMessagesRecord>;
