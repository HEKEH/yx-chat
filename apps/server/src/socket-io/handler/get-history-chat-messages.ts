import type {
  HistoryChatMessagesRequestBody,
  HistoryChatMessagesResponse,
} from '@yx-chat/shared/types';
import { shouldLogin } from './fn-decorators';
import { EventHandler, EventHandlerContext } from './types';
import { getMessagesByContactKey } from './utils';

const MESSAGES_FETCH_NUMBER = 30;

let getHistoryChatMessages: EventHandler = (
  context: EventHandlerContext,
  data: HistoryChatMessagesRequestBody,
): Promise<HistoryChatMessagesResponse> => {
  const { contactKey, offset } = data;
  return getMessagesByContactKey(contactKey, MESSAGES_FETCH_NUMBER, offset);
};

getHistoryChatMessages = shouldLogin(getHistoryChatMessages);

export default getHistoryChatMessages;
