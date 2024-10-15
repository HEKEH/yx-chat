import {
  RESPONSE_CODE,
  type ErrorResponse,
  type LoginSuccessResponse,
  type RegisterRequestBody,
} from '@yx-chat/shared/types';
import { errorResponse } from '@yx-chat/shared/utils';
import { register } from '~/request/auth-center';
import { EventHandler, EventHandlerContext } from './types';

const registerHandler: EventHandler = async (
  context: EventHandlerContext,
  data: RegisterRequestBody,
): Promise<LoginSuccessResponse | ErrorResponse> => {
  const { os, browser, environment } = data;
  const res = await register(data);
  if (res.status !== RESPONSE_CODE.SUCCESS) {
    return errorResponse(res.message);
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
