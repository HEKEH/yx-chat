import { AccountRequestType } from './account';
import { ChatMessageRequestType } from './chat';
import { ContactRequestType } from './contact';

export type AllRequestTypes =
  | AccountRequestType
  | ChatMessageRequestType
  | ContactRequestType;
