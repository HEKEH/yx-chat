import { ClientMessageType } from '@yx-chat/shared/types';

/** 所有需要发送的消息的父类 */
export abstract class MessageForSend<T = unknown> {
  abstract get type(): ClientMessageType;
  abstract get data(): T;
  abstract get name(): string; // 消息名称
}
