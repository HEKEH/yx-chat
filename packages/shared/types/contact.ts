import { ChatMessagesRecord } from './chat';

export interface Friend {
  id: string;
  createTime: string;
  to: {
    id: string;
    username: string;
    avatar: string;
  };
}

export interface Group {
  id: string;
  createTime: string;
  name: string;
  creator: string;
  avatar: string;
}

export enum ContactRequestType {
  createGroup = 'createGroup',
  joinGroup = 'addGroup',
}

export interface CreateGroupRequestBody {
  name: string;
}
export interface JoinGroupRequestBody {
  groupId: string;
}

export type CreateGroupSuccessResponse = Group; // is same currently

export interface JoinGroupSuccessResponse extends Group {
  messagesRecord: ChatMessagesRecord;
}
