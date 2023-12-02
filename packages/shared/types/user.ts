export interface UserBasicInfo {
  id: string;
  username: string;
  avatar: string;
  tag: string;
  isAdmin: boolean;
  notificationTokens: string[];
  // createTime: number;
}
