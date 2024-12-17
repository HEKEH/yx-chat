import type { AccountRequestType } from './account';
import type { ChatMessageRequestType } from './chat';
import type { ContactRequestType } from './contact';
import type { SystemRequestType } from './system';

export type AllRequestTypes =
  | AccountRequestType
  | ChatMessageRequestType
  | ContactRequestType
  | SystemRequestType;
