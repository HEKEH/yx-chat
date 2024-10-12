import {
  Environment,
  ServerMessage,
  UserBasicInfo,
} from '@yx-chat/shared/types';

export type EventHandler = (context: EventHandlerContext, data: any) => any;

export interface EventHandlerContext {
  readonly socketId: string;
  readonly socketIp: string;
  readonly userId: string | undefined;
  readonly userInfo: (Environment & UserBasicInfo) | undefined;
  setUserInfo: (userInfo: Environment & UserBasicInfo) => Promise<void>;
  sendFriendMessage: (
    friendId: string,
    message: ServerMessage,
    toSelf?: boolean,
  ) => Promise<void>;
  sendGroupMessage: (groupId: string, message: ServerMessage) => Promise<void>;
  /** add socket to room */
  joinToGroups: (groupIds: string[]) => void;
  readonly isAdmin: boolean;
  readonly isLogin: boolean;
}
