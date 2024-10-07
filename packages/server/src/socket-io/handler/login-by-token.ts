import assert from 'assert';
import type {
  ErrorResponse,
  LoginByTokenRequestBody,
  LoginSuccessResponse,
} from '@yx-chat/shared/types';
import { errorResponse } from '@yx-chat/shared/utils';
import UserModel from '../../database/mongoDB/model/user';
import { EventHandler, EventHandlerContext } from './types';
import {
  findFriendsAndGroupsByUserId,
  findNotificationsByUserId,
  parseToken,
} from './utils';

const loginByToken: EventHandler = async (
  context: EventHandlerContext,
  data: LoginByTokenRequestBody,
): Promise<LoginSuccessResponse | ErrorResponse> => {
  const { token, os, browser, environment } = data;
  assert(token, "Token can't be empty");
  let payload: ReturnType<typeof parseToken> | undefined;
  try {
    payload = parseToken(token);
  } catch (e) {
    return errorResponse('Illegal token');
  }
  assert(Date.now() < payload.expires, 'Token expires');
  assert.equal(environment, payload.environment, 'Illegal login');
  const { userId } = payload;
  const user = await UserModel.findOne(
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
  const userInfo = {
    id: user.id,
    avatar: user.avatar,
    username: user.username,
    tag: user.tag,
    isAdmin: user.isAdmin,
  };
  const [{ groups, friends }, notifications] = await Promise.all([
    findFriendsAndGroupsByUserId(userId),
    findNotificationsByUserId(userId),
    context.setUserInfo({ ...userInfo, os, browser, environment }),
  ]);
  context.joinToGroups(groups.map(({ id }) => id));

  return {
    ...userInfo,
    groups,
    friends,
    notifications,
  };
};

export default loginByToken;
