import { defineComponent } from 'vue';
import { getGlobalStore } from '~/utils/vue';
import { Avatar } from '../common/avatar';
import s from './index.module.sass';
import { HighButtons } from './buttons/HighButtons';
import { LowButtons } from './buttons/LowButtons';

export const Sidebar = defineComponent({
  name: 'MainSidebar',
  setup() {
    const globalStore = getGlobalStore();
    return () => {
      const { self } = globalStore;
      const avatar = self.avatar;
      return (
        <div class={s.sidebar}>
          <div class={s['avatar-container']}>
            <Avatar url={avatar} status="online" />
          </div>
          <div class={s['buttons-container']}>
            <div class={s['high-buttons-container']}>
              {self.hasLogged && <HighButtons />}
            </div>
            <div class={s['low-buttons-container']}>
              <LowButtons />
            </div>
          </div>
        </div>
      );
    };
  },
});
