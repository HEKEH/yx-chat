import { errorResponse } from '@yx-chat/shared/utils';
import { EventHandler, EventHandlerContext } from './types';

export function shouldLogin(eventHandler: EventHandler) {
  return async (context: EventHandlerContext, data: any) => {
    if (!context.isLogin) {
      return errorResponse('Please login first');
    }
    return await eventHandler(context, data);
  };
}
