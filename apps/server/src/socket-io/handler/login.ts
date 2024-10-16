import {
  type LoginRequestBody,
  type LoginSuccessResponse,
  RESPONSE_CODE,
} from '@yx-chat/shared/types';
import { BusinessError } from '~/biz-utils/business-error';
import { login } from '~/request/auth-center';
import logger from '../../utils/logger';
import { EventHandler, EventHandlerContext } from './types';
import {
  findFriendsAndGroupsByUserId,
  findNotificationsByUserId,
} from './utils';

const loginHandler: EventHandler = async (
  context: EventHandlerContext,
  data: LoginRequestBody,
): Promise<LoginSuccessResponse> => {
  const { username, os, browser, environment } = data;
  logger.trace(`login ${username}`);
  const res = await login(data);
  if (res.status !== RESPONSE_CODE.SUCCESS) {
    throw new BusinessError(res.message);
  }
  const { token, ...userInfo } = res.data;
  const [{ groups, friends }, notifications] = await Promise.all([
    findFriendsAndGroupsByUserId(userInfo.id),
    findNotificationsByUserId(userInfo.id),
    context.setUserInfo({
      ...userInfo,
      os,
      browser,
      environment,
    }),
  ]);
  context.joinToGroups(groups.map(({ id }) => id));
  return {
    ...userInfo,
    token,
    groups,
    friends,
    notifications,
  };
};

export default loginHandler;
