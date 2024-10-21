import { AccountRequestType } from './account.mjs';
import { ChatMessageRequestType } from './chat.mjs';
import { ContactRequestType } from './contact.mjs';
import { SystemRequestType } from './system.mjs';
import './notification.mjs';
import './user.mjs';
import './common.mjs';

type AllRequestTypes = AccountRequestType | ChatMessageRequestType | ContactRequestType | SystemRequestType;

export { AllRequestTypes };
