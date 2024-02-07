import { NotificationType } from '@yx-chat/shared/types';
import { GeneralTime } from '../common/time';

export type NotificationModel = {
  readonly id: string;
  readonly createTime: GeneralTime;
  readonly type: NotificationType;
};
