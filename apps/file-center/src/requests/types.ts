import { RESPONSE_CODE } from '@yx-chat/shared/types';

export type ResponseDataWrapper<T> =
  | {
      status: RESPONSE_CODE.SUCCESS;
      data: T;
    }
  | {
      status: Exclude<RESPONSE_CODE, RESPONSE_CODE.SUCCESS>;
      message: string;
    };
