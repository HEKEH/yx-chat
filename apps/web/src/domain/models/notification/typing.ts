import type { NotificationType } from '@yx-chat/shared/types';
import type { GeneralTime } from '../common/time';

export interface NotificationModel {
  readonly id: string;
  readonly createTime: GeneralTime;
  readonly type: NotificationType;
  /** remove from database */
  remove: () => Promise<void>;
}

export interface NotificationContext {
  removeNotification: (notification: NotificationModel) => void;
}
