import type {
  ChatMessage,
  ErrorResponse,
  LastMessagesRequestBody,
  LastMessagesResponse,
} from '@yx-chat/shared/types';
import ChatMessageModel from '../../database/mongoDB/model/chat-message';
import { UserDocument } from '../../database/mongoDB/model/user';
import HistoryModel from '../../database/mongoDB/model/history';
import { EventHandler, EventHandlerContext } from './types';
import { shouldLogin } from './fn-decorators';

const DEFAULT_MESSAGES_FETCH_NUMBER = 15;
const MAX_MESSAGES_FETCH_NUMBER = 100; // must surpass 99

async function getMessagesByContactKey(
  contactKey: string,
  limit: number,
): Promise<ChatMessage[]> {
  const messageList = await ChatMessageModel.find(
    { to: contactKey },
    {
      type: 1,
      content: 1,
      from: 1,
      createTime: 1,
      deleted: 1,
    },
    {
      sort: { createTime: -1 },
      limit,
    },
  ).populate('from', { username: 1, avatar: 1 });
  return messageList
    .map(item => {
      const from = item.from as unknown as UserDocument;
      return {
        content: item.content,
        createTime: item.createTime.toString(),
        deleted: item.deleted,
        type: item.type,
        id: item.id,
        from: {
          id: from.id,
          username: from.username,
          avatar: from.avatar,
        },
        to: contactKey,
      };
    })
    .reverse();
}

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
      messages: messages.slice(messages.length - DEFAULT_MESSAGES_FETCH_NUMBER),
      unread,
    };
    return prev;
  }, {} as LastMessagesResponse);
  return responseData;
};

getLastChatMessages = shouldLogin(getLastChatMessages);

export default getLastChatMessages;
