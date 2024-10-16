import { AllRequestTypes } from '@yx-chat/shared/types';

/** 所有需要发送的请求的父类 */
export abstract class AbstractSocketRequest<T extends object = object> {
  abstract get type(): AllRequestTypes;
  abstract get data(): T;
  abstract get name(): string; // 消息名称
}
