import { ChatMessageFormat, ChatMessageItem } from '@yx-chat/shared/types';

export interface IDraftItem<T> {
  readonly key: string;
  readonly type: ChatMessageFormat;
  readonly content: T;
  setContent(content: T): void;

  readonly errorMsg: string | undefined;

  generateChatItem():
    | Promise<ChatMessageItem | undefined>
    | (ChatMessageItem | undefined);
}
