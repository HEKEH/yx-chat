import { createOrUpdateHistory } from '@yx-chat/database';
import type {
  UpdateHistoryRequestBody,
  UpdateHistoryResponse,
} from '@yx-chat/shared/types';
import { shouldLogin } from './fn-decorators';
import { EventHandler, EventHandlerContext } from './types';

let updateHistory: EventHandler = async (
  context: EventHandlerContext,
  data: UpdateHistoryRequestBody,
): Promise<UpdateHistoryResponse> => {
  const { contactKey, messageId } = data;
  await createOrUpdateHistory({
    user: context.userId!,
    linkman: contactKey,
    message: messageId,
  });
  return { success: true };
};

updateHistory = shouldLogin(updateHistory);

export default updateHistory;
