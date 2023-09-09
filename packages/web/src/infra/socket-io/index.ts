import clientConfig from '@yx-chat/config/client';
import { ServerMessage, ServerMessageType } from '@yx-chat/shared/types';
import { Subject, Subscription } from 'rxjs';
import IO, { Socket } from 'socket.io-client';
import i18n from '../i18n';
import { AbstractSocketRequest } from './request/type';

const TIMEOUT_MILLISECONDS = 10000; // 十秒超时
const options = {
  reconnectionDelay: 5000, // 5秒重连
};

/** socket的全局事件类型 */
export enum SocketEventType {
  connectError = 'connect-error',
  disconnect = 'disconnect',
}

export interface SocketEventListenerMap {
  [SocketEventType.connectError]: ((err: Error) => void)[];
  [SocketEventType.disconnect]: ((reason: string) => void)[];
}

type MessageListener<
  T extends ServerMessageType,
  M extends ServerMessage<T>,
> = (message: M) => void;

export type MessageListenerMap = {
  [T in ServerMessageType]?: Subject<ServerMessage<T>>;
};

/** 对Socket做一层封装 */
export class SocketIO {
  private _io!: Socket;
  private _readyCallbacks: (() => void)[] = [];
  private _isConnected = false;
  private _messageListenerMap: MessageListenerMap = {};
  private _eventListenerMap: SocketEventListenerMap = {
    [SocketEventType.connectError]: [],
    [SocketEventType.disconnect]: [],
  };
  /** 连接服务端 */
  connect() {
    this._io = IO(clientConfig.server, options);
    this._bindEvents();
    this._io.connect();
  }
  /** 断开连接 */
  disconnect() {
    this._io.disconnect();
  }
  /** 等待就绪 */
  onReady(callback?: () => void): Promise<void> {
    // 如果已经就绪，那么直接返回
    if (this._isConnected) {
      callback?.();
      return Promise.resolve();
    }
    return new Promise(resolve => {
      this._readyCallbacks.push(() => {
        callback?.();
        resolve();
      });
    });
  }
  /** 给后台发送消息 */
  async fetch<T>(request: AbstractSocketRequest): Promise<T> {
    if (!this._isConnected) {
      await this.onReady();
    }
    return new Promise((resolve, reject) => {
      this._io
        .timeout(TIMEOUT_MILLISECONDS)
        .emit(request.type, request.data, (err: any, response: T) => {
          console.log(err, response, 'fetch result');
          // TODO 暂时不确定会不会生效
          if (err) {
            reject(err);
          } else {
            resolve(response);
          }
        });
    });
  }
  /** 注册针对消息类型的消息处理者 */
  addMessageListener<T extends ServerMessageType, M extends ServerMessage<T>>(
    messageType: T,
    callback: MessageListener<T, M>,
  ): Subscription {
    if (!this._messageListenerMap[messageType]) {
      this._messageListenerMap[messageType] = new Subject<ServerMessage>();
    }
    return (
      this._messageListenerMap[messageType]! as unknown as Subject<M>
    ).subscribe(callback);
  }

  addSocketEventListener<T extends SocketEventType>(
    eventType: T,
    callback: SocketEventListenerMap[T][number],
  ) {
    const eventListerList: Array<typeof callback> =
      this._eventListenerMap[eventType];
    eventListerList.push(callback);
  }

  removeSocketEventListener<T extends SocketEventType>(
    eventType: T,
    callback: SocketEventListenerMap[T][number],
  ) {
    this._eventListenerMap[eventType] = (
      this._eventListenerMap[eventType] as Array<typeof callback>
    ).filter(item => item !== callback) as SocketEventListenerMap[T];
  }

  private _bindEvents() {
    this._io.on('connect_error', (e: Error) => {
      console.error(e, i18n.global.t('server.connectError'));
      this._eventListenerMap[SocketEventType.connectError].forEach(cb => {
        cb(e);
      });
    });
    this._io.on('connect', () => {
      this._isConnected = true;
      // 让正在等待onReady的异步函数继续进行
      this._readyCallbacks.forEach(cb => {
        cb();
      });
      this._readyCallbacks = [];
    });
    this._io.on('disconnect', (reason: string) => {
      this._isConnected = false;
      this._eventListenerMap[SocketEventType.disconnect].forEach(cb => {
        cb(reason);
      });
    });
    this._io.on('message', (message: ServerMessage) => {
      console.log(message, '收到消息');
      const type = message.type;
      if (!Reflect.has(this._messageListenerMap, type)) {
        throw new Error(`未找到${type}类型消息的接受者`);
      }
      this._messageListenerMap[type]!.next(message);
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  private static _instance: SocketIO | null = null;
  /** 单例 */
  static get instance(): SocketIO {
    if (!this._instance) {
      this._instance = new SocketIO();
    }
    return this._instance;
  }
}
