import { defineComponent } from 'vue';

import s from './index.module.sass';
import { getGlobalStore } from '~/utils/vue';

export const MessageList = defineComponent({
  name: 'MessageList',
  setup() {
    const globalStore = getGlobalStore();
    return () => {
      return (
        <div class={s['message-list']}>

        </div>
      );
    };
  },
});
