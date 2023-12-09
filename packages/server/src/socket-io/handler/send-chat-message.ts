import assert from 'assert';
import type {
  ChatMessage,
  ErrorResponse,
  SendChatMessageBody,
} from '@yx-chat/shared/types';
import xss from 'xss';
import { errorResponse } from '@yx-chat/shared/utils';
import UserModel from '../../database/mongoDB/model/user';
import ChatMessageModel from '../../database/mongoDB/model/chat-message';
import { createOrUpdateHistory } from '../../database/mongoDB/model/history';
import { shouldLogin } from './fn-decorators';
import { EventHandler, EventHandlerContext } from './types';

let sendChatMessage: EventHandler = async (
  context: EventHandlerContext,
  data: SendChatMessageBody,
): Promise<ChatMessage | ErrorResponse> => {
  let { content } = data;
  assert(content.length <= 2048, 'Message content is too long');
  content = xss(content);

  const { type, to } = data;
  const userId = context.userId!;
  const user = await UserModel.findOne(
    { _id: userId },
    { username: 1, avatar: 1, tag: 1 },
  );
  if (!user) {
    return errorResponse('User not exist');
  }
  const message = await ChatMessageModel.create({
    from: userId,
    to,
    type,
    content,
  });
  const messageData: ChatMessage = {
    id: message.id!,
    content,
    createTime: message.createTime.toString(),
    deleted: false,
    type,
    from: {
      id: userId,
      username: user.username,
      avatar: user.avatar,
    },
    to,
  };
  createOrUpdateHistory({
    user: userId,
    linkman: to,
    message: messageData.id,
  });
  return messageData;
};

sendChatMessage = shouldLogin(sendChatMessage);

export default sendChatMessage;
