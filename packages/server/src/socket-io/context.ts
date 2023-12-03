import { AssertionError } from 'assert';
import { errorResponse } from '@yx-chat/shared/utils';
import { Socket } from 'socket.io';
import logger from '../utils/logger';
import config from '../config';
import { EventHandler, EventHandlerContext } from './handler/types';

export class SocketContext implements EventHandlerContext {
  private _socket: Socket;
  private _userId: string | undefined;

  get socketId() {
    return this._socket.id;
  }
  get socketIp() {
    return this._socket.request.socket.remoteAddress || '';
  }
  get userId() {
    return this._userId;
  }
  setUserId(userId: string) {
    this._userId = userId;
  }
  get isAdmin(): boolean {
    return Boolean(
      this._userId && config.administrators.includes(this._userId),
    );
  }
  get isLogin(): boolean {
    return Boolean(this._userId);
  }
  on(eventName: string, handler: EventHandler) {
    this._socket.on(eventName, async (data, callback) => {
      try {
        const before = Date.now();
        const res = await handler(this, data);
        const after = Date.now();
        logger.info(
          `[${eventName}]`,
          after - before,
          this.socketId,
          this.userId || 'null',
          JSON.stringify(res),
        );
        callback(res);
      } catch (err) {
        if (err instanceof AssertionError) {
          callback(errorResponse(err.message));
        } else {
          logger.error(`[${eventName}]`, (err as Error).message);
          callback(errorResponse(`Server Error: ${(err as Error).message}`));
        }
      }
    });
  }
  constructor(socket: Socket) {
    this._socket = socket;
  }
}