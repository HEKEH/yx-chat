import {
  ErrorResponse,
  RejectFriendAddRequestBody,
} from '@yx-chat/shared/types';
import { BusinessError } from '~/biz-utils/business-error';
import FriendAddRequestModel from '../../database/mongoDB/model/friend-add-request';
import { shouldLogin } from './fn-decorators';
import { EventHandler, EventHandlerContext } from './types';
import { isIdValid } from './utils';

let rejectFriendAddRequest: EventHandler = async (
  context: EventHandlerContext,
  data: RejectFriendAddRequestBody,
): Promise<void> => {
  const { requestId } = data;
  if (!isIdValid(requestId)) {
    throw new BusinessError('Invalid request id');
  }
  const request = await FriendAddRequestModel.findOne({
    _id: requestId,
  });
  if (!request) {
    throw new BusinessError("Request doesn't exists");
  }
  if (request.to.toString() !== context.userId) {
    throw new BusinessError('Not your request');
  }
  request.deleted = true;
  await request.save();
};

rejectFriendAddRequest = shouldLogin(rejectFriendAddRequest);

export default rejectFriendAddRequest;
