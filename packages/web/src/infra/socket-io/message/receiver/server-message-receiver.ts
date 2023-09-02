import { ServerMessageType } from '@yx-chat/shared/types';

/** 接收、处理后台发过来的消息 */
export abstract class ServerMessageReceiver<
  T extends ServerMessageType,
  M extends {
    type: T;
  } = {
    type: T;
  },
> {
  /** 接收信息 */
  abstract receiveMessage(message: M): void;
}
