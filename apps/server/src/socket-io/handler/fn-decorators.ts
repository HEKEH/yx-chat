import { BusinessError } from '~/utils/error';
import { EventHandler, EventHandlerContext } from './types';

export function shouldLogin(eventHandler: EventHandler) {
  return async (context: EventHandlerContext, data: any) => {
    if (!context.isLogin) {
      throw new BusinessError('Please login first');
    }
    return await eventHandler(context, data);
  };
}
