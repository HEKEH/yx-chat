import {
  ErrorResponse,
  RejectFriendAddRequestBody,
} from '@yx-chat/shared/types';
import { errorResponse } from '@yx-chat/shared/utils';
import FriendAddRequestModel from '../../database/mongoDB/model/friend-add-request';
import { shouldLogin } from './fn-decorators';
import { EventHandler, EventHandlerContext } from './types';
import { isIdValid } from './utils';

let rejectFriendAddRequest: EventHandler = async (
  context: EventHandlerContext,
  data: RejectFriendAddRequestBody,
): Promise<void | ErrorResponse> => {
  const { requestId } = data;
  if (!isIdValid(requestId)) {
    return errorResponse('Invalid request id');
  }
  const request = await FriendAddRequestModel.findOne({
    _id: requestId,
  });
  if (!request) {
    return errorResponse("Request doesn't exists");
  }
  if (request.to.toString() !== context.userId) {
    return errorResponse('Not your request');
  }
  request.deleted = true;
  await request.save();
};

rejectFriendAddRequest = shouldLogin(rejectFriendAddRequest);

export default rejectFriendAddRequest;
