import { MessageTypeEnum } from './MessageTypeEnum';

/** 所有需要发送的消息的父类 */
export abstract class MessageForSend<T = unknown> {
  abstract get type(): MessageTypeEnum;
  abstract get data(): T;
  abstract get name(): string; // 消息名称
}
