/** 接收、处理后台发过来的消息 */
export abstract class MessageReceiver<T = unknown> {
  /** 接收信息 */
  abstract receiveMessage(message: T): void;
}
