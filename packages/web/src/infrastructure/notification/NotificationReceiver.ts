/** 接收、处理后台发过来的消息 */
export abstract class NotificationReceiver<T = unknown> {
  /** 接收信息 */
  abstract receiveNotification(notification: T): void;
}
