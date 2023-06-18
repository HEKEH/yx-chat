import { defineComponent } from 'vue';
import { getServices } from '~/utils/vue';
import s from './index.module.sass';
import { AccountButton } from '../account/AccountButton';

export const Homepage = defineComponent({
  setup(props, ctx) {
    const services = getServices();
    return () => {
      return (
        <div class={s.homepage}>
          {services.m.account.loginUser.isReady && <div>登录成功</div>}
          <AccountButton />
        </div>
      );
    };
  },
});
