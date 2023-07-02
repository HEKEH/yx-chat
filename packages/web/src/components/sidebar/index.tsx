import { defineComponent } from 'vue';
import { Avatar } from '../common/avatar';
import s from './index.module.sass';
import { Buttons } from './buttons';
import { getServices } from '~/utils/vue';

export const Sidebar = defineComponent({
  setup() {
    const services = getServices();
    const { account } = services;
    return () => {
      const { self } = account;
      const avatar = self.userInfo?.avatar;
      return (
        <div class={s.sidebar}>
          <div class={s['avatar-container']}>
            <Avatar url={avatar} status="online" />
          </div>
          <div class={s['buttons-container']}>
            <Buttons />
          </div>
        </div>
      );
    };
  },
});
