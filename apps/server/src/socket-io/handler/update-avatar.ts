import { RESPONSE_CODE, UpdateAvatarRequestBody } from '@yx-chat/shared/types';
import { updateAvatar } from '~/requests/auth-center';
import { WithLng } from '~/types';
import { BusinessError } from '~/utils/error';
import { EventHandler, EventHandlerContext } from './types';

const updateAvatarHandler: EventHandler = async (
  context: EventHandlerContext,
  data: WithLng<Pick<UpdateAvatarRequestBody, 'avatar'>>,
) => {
  const { avatar } = data;
  const res = await updateAvatar({
    avatar,
    token: context.token,
  });
  if (res.status !== RESPONSE_CODE.SUCCESS) {
    throw new BusinessError(res.message);
  }
};

export default updateAvatarHandler;
