export type EventHandler = (context: EventHandlerContext, data: any) => any;

export interface EventHandlerContext {
  readonly socketId: string;
  readonly socketIp: string;
  readonly userId: string | undefined;
  setUserId: (userId: string) => void;
  readonly isAdmin: boolean;
  readonly isLogin: boolean;
}
