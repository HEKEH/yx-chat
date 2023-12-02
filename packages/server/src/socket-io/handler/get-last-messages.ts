import type {
  ErrorResponse,
  LastMessagesRequestBody,
  LastMessagesResponse,
} from '@yx-chat/shared/types';
import { EventHandler, EventHandlerContext } from './types';

const getLastMessages: EventHandler = async (
  context: EventHandlerContext,
  data: LastMessagesRequestBody,
): Promise<LastMessagesResponse | ErrorResponse> => {
  return {};
};

export default getLastMessages;
