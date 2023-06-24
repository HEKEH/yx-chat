import { User } from './user';

export interface Environment {
  /** 客户端系统 */
  os: string;
  /** 客户端浏览器 */
  browser: string;
  /** 客户端环境信息 */
  environment: string;
}

export interface LoginData extends Environment {
  username: string;
  password: string;
}

export type RegisterData = LoginData;

export interface LoginSuccessResponse extends User {
  token: string;
  friends: []; // TODO
  groups: []; // TODO
}

export type LoginByTokenSuccessResponse = Omit<LoginSuccessResponse, 'token'>; // no token when login by token

// {
//   "_id": "648f3a1917ca19a6c7cd1469",
//   "avatar": "/avatar/13.jpg",
//   "username": "gust",
//   "groups": [
//       {
//           "_id": "648dbebf17ca19a6c7cd12d8",
//           "name": "fiora",
//           "avatar": "/avatar/4.jpg",
//           "creator": "648dbf7717ca19a6c7cd12e3",
//           "createTime": "2023-06-17T14:10:07.119Z",
//           "messages": []
//       }
//   ],
//   "friends": [],
//   "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjoiNjQ4ZjNhMTkxN2NhMTlhNmM3Y2QxNDY5IiwiZW52aXJvbm1lbnQiOiJDaHJvbWUgMTEzLjAuMC4wIG9uIE9TIFggMTAuMTUuNyA2NC1iaXQiLCJleHBpcmVzIjoxNjg5NzAwMTIxMTc2fQ.RINp-92DPXMMlzQ4V2oYxQZcoY5yh7Z43tDSfigHTVU",
//   "isAdmin": false,
//   "notificationTokens": []
// }
