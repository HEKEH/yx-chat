import { Environment, ServerMessage } from '@yx-chat/shared/types';

export type EventHandler = (context: EventHandlerContext, data: any) => any;

export interface EventHandlerContext {
  readonly socketId: string;
  readonly socketIp: string;
  readonly userId: string | undefined;
  setUserInfo: (userInfo: Environment & { userId: string }) => Promise<void>;
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
