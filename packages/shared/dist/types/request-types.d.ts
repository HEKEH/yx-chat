import { AccountRequestType } from './account.js';
import { ChatMessageRequestType } from './chat.js';
import { ContactRequestType } from './contact.js';
import { SystemRequestType } from './system.js';
import './notification.js';
import './user.js';
import './common.js';

type AllRequestTypes = AccountRequestType | ChatMessageRequestType | ContactRequestType | SystemRequestType;

export { AllRequestTypes };
