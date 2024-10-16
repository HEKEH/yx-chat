import {
  RESPONSE_CODE,
  type LoginSuccessResponse,
  type RegisterRequestBody,
} from '@yx-chat/shared/types';
import { BusinessError } from '~/biz-utils/business-error';
import { register } from '~/request/auth-center';
import { WithLng } from '~/types';
import { EventHandler, EventHandlerContext } from './types';

const registerHandler: EventHandler = async (
  context: EventHandlerContext,
  data: WithLng<RegisterRequestBody>,
): Promise<LoginSuccessResponse> => {
  const { os, browser, environment } = data;
  const res = await register(data);
  if (res.status !== RESPONSE_CODE.SUCCESS) {
    throw new BusinessError(res.message);
  }
  const { token, ...userInfo } = res.data;
  await context.setUserInfo({ ...userInfo, os, browser, environment });
  return {
    ...userInfo,
    token,
    groups: [],
    friends: [],
    notifications: [],
  };
};

export default registerHandler;
