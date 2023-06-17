import IO, { Socket } from 'socket.io-client';
import clientConfig from "@yx-chat/config/client";
import { MessageForSend } from '../message/MessageForSend';
import { MessageTypeEnum } from '../message/MessageTypeEnum';
import { NotificationReceiver } from '../notification/NotificationReceiver';

const TIMEOUT_MILLISECONDS = 10000; // 十秒超时
const options = {
    reconnectionDelay: 1000, // 一秒重连
};
/** 对Socket做一层封装 */
export class SocketIO {
    private _io: Socket = IO(clientConfig.server, options);
    private _readyCallbacks: Function[] = [];
    private _isConnected: boolean = false;
    private _notificationReceiverMap: {
        [messageType in MessageTypeEnum]?: NotificationReceiver
    } = {}
    /** 连接后台 */
    connect() {
        this._bindEvents();
        this._io.connect();
    }
    /** 断开连接 */
    disconnect() {
        this._io.disconnect();
    }
    /** 等待就绪 */
    onReady(): Promise<void> | void {
        // 如果已经就绪，那么直接返回
        if (this._isConnected) {
            return;
        }
        return new Promise(resolve => {
            this._readyCallbacks.push(resolve);
        });
    }
    /** 给后台发送消息 */
    fetch<T>(message: MessageForSend): Promise<T> {
        return new Promise((resolve, reject) => {
            this._io.timeout(TIMEOUT_MILLISECONDS).emit(message.type, message.data, (err: any, response: T) => { // TODO 暂时不确定会不会生效
                if (err) {
                    reject(err);
                } else {
                    resolve(response);
                }
            });
        });
    }
    /** 注册针对消息类型的消息处理者 */
    registerNotificationReceiver(messageType: MessageTypeEnum, notificationReceiver: NotificationReceiver) {
        this._notificationReceiverMap[messageType] = notificationReceiver
    }
    private _bindEvents() {
        this._io.on(
            "connect",
            () => {
                this._isConnected = true;
                // 让正在等待onReady的异步函数继续进行
                this._readyCallbacks.forEach(cb => { cb(); });
                this._readyCallbacks = [];
            },
        );
        this._io.on(
            "message",
            (notification: {
                type: MessageTypeEnum,
            }) => {
                const type = notification.type;
                if (!Reflect.has(this._notificationReceiverMap, type)) {
                    throw new Error(`未找到${type}类型消息的接受者`);
                }
                this._notificationReceiverMap[type]!.receiveNotification(notification);
            },
        );
    }

    private constructor() { }
    /** 单例 */
    static instance(): SocketIO {
        if (!socketIO) {
            socketIO = new SocketIO();
            socketIO.connect();
        }
        return socketIO;
    }
}
let socketIO: SocketIO | null = null;
