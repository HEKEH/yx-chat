import { AccountRequestType } from './account';
import { ChatMessageRequestType } from './chat';
import { ContactRequestType } from './contact';
import { SystemRequestType } from './system';

export type AllRequestTypes =
  | AccountRequestType
  | ChatMessageRequestType
  | ContactRequestType
  | SystemRequestType;
