import {
  RESPONSE_CODE,
  type LoginByTokenRequestBody,
  type LoginSuccessResponse,
} from '@yx-chat/shared/types';
import { BusinessError } from '~/biz-utils/business-error';
import { loginByToken } from '~/request/auth-center';
import { EventHandler, EventHandlerContext } from './types';
import {
  findFriendsAndGroupsByUserId,
  findNotificationsByUserId,
} from './utils';

const loginByTokenHandler: EventHandler = async (
  context: EventHandlerContext,
  data: LoginByTokenRequestBody,
): Promise<LoginSuccessResponse> => {
  const { os, browser, environment } = data;
  const res = await loginByToken(data);
  if (res.status !== RESPONSE_CODE.SUCCESS) {
    throw new BusinessError(res.message);
  }
  const userInfo = res.data;
  const [{ groups, friends }, notifications] = await Promise.all([
    findFriendsAndGroupsByUserId(userInfo.id),
    findNotificationsByUserId(userInfo.id),
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

export default loginByTokenHandler;
