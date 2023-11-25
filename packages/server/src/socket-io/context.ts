import { AssertionError } from 'assert';
import { Socket } from 'socket.io';
import { errorResponse } from '@yx-chat/shared/utils';
import logger from '../utils/logger';

export class SocketContext {
  private _socket: Socket;
  get id() {
    return this._socket.id;
  }
  get user() {
    return this._socket.data.user;
  }
  get isAdmin() {
    return this._socket.data.isAdmin;
  }
  get socketIp() {
    return this._socket.request.socket.remoteAddress || '';
  }
  on(eventName: string, handler: (context: SocketContext, data: any) => any) {
    this._socket.on(eventName, async (data, callback) => {
      try {
        const before = Date.now();
        const res = await handler(this, data);
        const after = Date.now();
        logger.info(
          `[${eventName}]`,
          after - before,
          this.id,
          this.user || 'null',
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
