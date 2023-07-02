import { defineComponent } from 'vue';
import { AccountButton } from '../account/AccountButton';
import { Sidebar } from '../sidebar';
import s from './index.module.sass';
import { getServices } from '~/utils/vue';

export const Homepage = defineComponent({
  setup() {
    const services = getServices();
    return () => {
      return (
        <div class={s.homepage}>
          <div class={s.main}>
            <div class={s['sidebar-container']}>
              <Sidebar />
            </div>
            <div class={s['contact-container']}></div>
            <div class={s['chat-container']}>
              {services.account.self.hasLogged && <div>登录成功</div>}
              <AccountButton />
            </div>
          </div>
        </div>
      );
    };
  },
});
