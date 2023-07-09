export interface Friend {
  __v: number;
  _id: string;
  createTime: string;
  from: string;
  to: {
    _id: string;
    username: string;
    avatar: string;
  };
}

export interface Group {
  _id: string;
  createTime: string;
  name: string;
  creator: string;
  avatar: string;
}
