import type {
  ChatMessage,
  ErrorResponse,
  LastMessagesRequestBody,
  LastMessagesResponse,
} from '@yx-chat/shared/types';
import ChatMessageModel from '../../database/mongoDB/model/chat-message';
import { UserDocument } from '../../database/mongoDB/model/user';
import { EventHandler, EventHandlerContext } from './types';
import { shouldLogin } from './fn-decorators';

async function getMessagesByContactKey(
  contactKey: string,
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
      limit: 15,
      // limit: historyMap[linkmanId] ? 100 : FirstTimeMessagesCount,
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

let getLastChatMessages: EventHandler = async (
  context: EventHandlerContext,
  data: LastMessagesRequestBody,
): Promise<LastMessagesResponse | ErrorResponse> => {
  const { contactKeys } = data;
  const messagesList = await Promise.all(
    contactKeys.map(getMessagesByContactKey),
  );
  const responseData = contactKeys.reduce((prev, cur, index) => {
    prev[cur] = {
      messages: messagesList[index],
      unread: 0,
    };
    return prev;
  }, {} as LastMessagesResponse);
  return responseData;
};

getLastChatMessages = shouldLogin(getLastChatMessages);

export default getLastChatMessages;
