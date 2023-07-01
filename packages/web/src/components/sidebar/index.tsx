import { defineComponent } from 'vue';
import { Avatar } from '../common/avatar';
import s from './index.module.sass';
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
            <Avatar url={avatar} />
          </div>
          {/* <div>1221</div> */}
        </div>
      );
    };
  },
});
