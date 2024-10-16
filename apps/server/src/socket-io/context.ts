import { AssertionError } from 'assert';
import {
  Environment,
  ServerMessage,
  UserBasicInfo,
} from '@yx-chat/shared/types';
import { errorResponse } from '@yx-chat/shared/utils';
import { Socket } from 'socket.io';
import { uniq } from 'lodash';
import { BusinessError } from '~/biz-utils/business-error';
import logger from '~/utils/logger';
import SocketModel from '~/database/mongoDB/model/socket';
import { LANGUAGE } from '@yx-chat/shared/constants';
import { t } from '~/i18n';
import { EventHandler, EventHandlerContext } from './handler/types';

export class SocketContext implements EventHandlerContext {
  private _socket: Socket;
  private _userInfo: (Environment & UserBasicInfo) | undefined;

  get socketId() {
    return this._socket.id;
  }
  get socketIp() {
    return this._socket.request.socket.remoteAddress || '';
  }
  get userId() {
    return this._userInfo?.id;
  }
  get userInfo() {
    return this._userInfo;
  }
  async setUserInfo(userInfo: Environment & UserBasicInfo) {
    this._userInfo = userInfo;
    const { os, browser, environment } = userInfo;
    await SocketModel.updateOne(
      { id: this.socketId },
      {
        user: userInfo.id,
        ip: this.socketIp,
        os,
        browser,
        environment,
      },
    );
  }
  get isAdmin(): boolean {
    return Boolean(this.userInfo?.isAdmin);
  }
  get isLogin(): boolean {
    return Boolean(this._userInfo);
  }
  on(eventName: string, handler: EventHandler) {
    this._socket.on(eventName, async (data, callback) => {
      const lng = data?.lng as LANGUAGE | undefined;
      try {
        const before = Date.now();
        const res = await handler(this, data);
        const after = Date.now();
        logger.info(
          `[${eventName}]`,
          after - before,
          this.socketId,
          this.userId || 'null',
          data,
          JSON.stringify(res),
        );
        callback(res);
      } catch (err) {
        if (err instanceof AssertionError || err instanceof BusinessError) {
          logger.error(`[${eventName} Business Error]`, data, err);
          callback(errorResponse(t(err.message, { lng })));
        } else {
          logger.error(`[${eventName} Internal Error]`, data, err);
          callback(errorResponse(t('An unexpected error occurred', { lng })));
        }
      }
    });
  }
  async sendFriendMessage(
    friendId: string,
    message: ServerMessage,
    toSelf = false,
  ) {
    const [targetSockets, selfSockets] = await Promise.all([
      SocketModel.find({ user: friendId }, { id: 1 }),
      toSelf ? SocketModel.find({ user: this.userId }, { id: 1 }) : [],
    ]);
    const socketIds = uniq([
      ...targetSockets.map(item => item.id),
      ...selfSockets.map(item => item.id),
    ]).filter(item => item !== this.socketId);
    if (socketIds.length) {
      this._socket.to(socketIds).emit('message', message);
    }
  }
  async sendGroupMessage(groupId: string, message: ServerMessage) {
    this._socket.to(groupId).emit('message', message);
  }

  /** add socket to room */
  joinToGroups(groupIds: string[]) {
    this._socket.join(groupIds);
  }
  constructor(socket: Socket) {
    this._socket = socket;
  }
}
