import {
  RESPONSE_CODE,
  UpdateUserInfoRequestBody,
} from '@yx-chat/shared/types';
import { updateUserInfo } from '~/requests/auth-center';
import { WithLng } from '~/types';
import { BusinessError } from '~/utils/error';
import { EventHandler, EventHandlerContext } from './types';

const updateUserInfoHandler: EventHandler = async (
  context: EventHandlerContext,
  data: WithLng<Omit<UpdateUserInfoRequestBody, 'token'>>,
) => {
  const res = await updateUserInfo({
    ...data,
    token: context.token,
  });
  if (res.status !== RESPONSE_CODE.SUCCESS) {
    throw new BusinessError(res.message);
  }
};

export default updateUserInfoHandler;
