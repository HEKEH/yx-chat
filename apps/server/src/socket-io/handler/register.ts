import {
  RESPONSE_CODE,
  type LoginSuccessResponse,
  type RegisterRequestBody,
} from '@yx-chat/shared/types';
import { BusinessError } from '~/utils/error';
import { register } from '~/requests/auth-center';
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
  context.setToken(token);
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
