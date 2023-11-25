import assert from 'assert';
import type {
  LoginByTokenRequestBody,
  LoginSuccessResponse,
  ErrorResponse,
} from '@yx-chat/shared/types';
import { errorResponse } from '@yx-chat/shared/utils';
import logger from '../../utils/logger';
import { SocketContext } from '../context';
import User from '../../database/mongoDB/model/user';
import config from '../../config';
import { parseToken } from './utils';

export default async function loginByToken(
  context: SocketContext,
  data: LoginByTokenRequestBody,
): Promise<LoginSuccessResponse | ErrorResponse> {
  const { token, os, browser, environment } = data;
  assert(token, 'Token cannot be empty');
  let payload: ReturnType<typeof parseToken> | undefined;
  try {
    payload = parseToken(token);
  } catch (e) {
    return errorResponse('Illegal token');
  }
  assert(Date.now() < payload.expires, 'Token expires');
  assert.equal(environment, payload.environment, 'Illegal login');
  const { userId } = payload;
  const user = await User.findOne(
    { _id: userId },
    {
      _id: 1,
      avatar: 1,
      username: 1,
      tag: 1,
      createTime: 1,
    },
  );
  if (!user) {
    return errorResponse("User doesn't exist");
  }

  return {
    _id: user._id,
    avatar: user.avatar,
    username: user.username,
    tag: user.tag,
    isAdmin: config.administrators.includes(user._id.toString()),
    groups: [],
    friends: [],
    notificationTokens: [],
  };
}
