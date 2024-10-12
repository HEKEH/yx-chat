import type {
  ErrorResponse,
  LastMessagesRequestBody,
  LastMessagesResponse,
} from '@yx-chat/shared/types';
import HistoryModel from '../../database/mongoDB/model/history';
import {
  DEFAULT_MESSAGES_FETCH_NUMBER,
  MAX_MESSAGES_FETCH_NUMBER,
} from '../../const';
import { shouldLogin } from './fn-decorators';
import { EventHandler, EventHandlerContext } from './types';
import { getMessagesByContactKey } from './utils';

async function getHistoryMap(
  userId: string,
  to: string[],
): Promise<Record<string, string>> {
  // key is to id, value is message id
  const histories = await HistoryModel.find({
    user: userId,
    linkman: {
      $in: to,
    },
  });
  return histories
    .filter(Boolean)
    .reduce((result: Record<string, string>, history) => {
      result[history.linkman] = history.message;
      return result;
    }, {});
}

let getLastChatMessages: EventHandler = async (
  context: EventHandlerContext,
  data: LastMessagesRequestBody,
): Promise<LastMessagesResponse | ErrorResponse> => {
  const { contactKeys } = data;
  const historyMap = await getHistoryMap(context.userId!, contactKeys);
  const messagesList = await Promise.all(
    contactKeys.map(contactKey =>
      getMessagesByContactKey(
        contactKey,
        historyMap[contactKey]
          ? MAX_MESSAGES_FETCH_NUMBER
          : DEFAULT_MESSAGES_FETCH_NUMBER,
      ),
    ),
  );
  const responseData = contactKeys.reduce((prev, cur, index) => {
    const messages = messagesList[index];
    let unread = 0;
    if (historyMap[cur]) {
      const lastReadMessageIndex = messages.findIndex(
        msg => msg.id === historyMap[cur],
      );
      unread =
        lastReadMessageIndex === -1
          ? Math.max(MAX_MESSAGES_FETCH_NUMBER, messages.length)
          : messages.length - lastReadMessageIndex - 1;
    }

    prev[cur] = {
      messages: messages.slice(
        Math.max(messages.length - DEFAULT_MESSAGES_FETCH_NUMBER, 0),
      ),
      unread,
    };
    return prev;
  }, {} as LastMessagesResponse);
  return responseData;
};

getLastChatMessages = shouldLogin(getLastChatMessages);

export default getLastChatMessages;
