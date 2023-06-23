import IO, { Socket } from 'socket.io-client';
import clientConfig from '@yx-chat/config/client';
import { ServerMessageType } from '@yx-chat/shared/types';
import { MessageForSend } from './message/send/MessageForSend';
import { MessageReceiver } from './message/receive/MessageReceiver';

const TIMEOUT_MILLISECONDS = 10000; // 十秒超时
const options = {
  reconnectionDelay: 5000, // 5秒重连
};
/** 对Socket做一层封装 */

/** socket的全局事件类型 */
export enum SocketEventType {
  connectError = 'connect-error',
}

export interface SortEventListenerMap {
  [SocketEventType.connectError]: ((err: Error) => void)[];
}

export class SocketIO {
  private _io!: Socket;
  // eslint-disable-next-line @typescript-eslint/ban-types
  private _readyCallbacks: Function[] = [];
  private _isConnected = false;
  private _messageReceiverMap: {
    [x in ServerMessageType]?: MessageReceiver[];
  } = {};
  private _eventListenerMap: SortEventListenerMap = {
    [SocketEventType.connectError]: [],
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
  async fetch<T>(message: MessageForSend): Promise<T> {
    if (!this._isConnected) {
      await this.onReady();
    }
    return new Promise((resolve, reject) => {
      this._io
        .timeout(TIMEOUT_MILLISECONDS)
        .emit(message.type, message.data, (err: any, response: T) => {
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
  registerMessageReceiver(
    messageType: ServerMessageType,
    messageReceiver: MessageReceiver,
  ) {
    if (!this._messageReceiverMap[messageType]) {
      this._messageReceiverMap[messageType] = [];
    }
    this._messageReceiverMap[messageType]!.push(messageReceiver);
  }

  addSocketEventListener<T extends SocketEventType>(
    eventType: T,
    callback: SortEventListenerMap[T][0],
  ) {
    this._eventListenerMap[eventType].push(callback);
  }

  removeSocketEventListener(eventType: SocketEventType, callback: () => void) {
    this._eventListenerMap[eventType] = this._eventListenerMap[
      eventType
    ]?.filter(item => item !== callback);
  }

  private _bindEvents() {
    this._io.on('connect_error', (e: Error) => {
      console.error(e, '服务端连接失败');
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
    this._io.on('message', (message: { type: ServerMessageType }) => {
      console.log(message, '收到消息');
      const type = message.type;
      if (!Reflect.has(this._messageReceiverMap, type)) {
        throw new Error(`未找到${type}类型消息的接受者`);
      }
      this._messageReceiverMap[type]!.forEach(receiver => {
        receiver.receiveMessage(message);
      });
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
