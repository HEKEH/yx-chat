export enum NotificationType {
  FriendAddNotification = 'FriendAddNotification',
}

export interface FriendAddNotification {
  type: NotificationType.FriendAddNotification;
  id: string;
  from: {
    id: string; // user id
    username: string;
    avatar: string;
  };
  createTime: string;
  message: string;
}

export type Notification = FriendAddNotification; // 后面可以扩张
